import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";
import { sendEmail, verifyEmailConfig } from "@/utils/email";
import { generateContactExcel, appendToMasterExcel, ContactFormData } from "@/utils/excel";

const client = createClient(clientConfig);

// Enhanced response creator with better typing
interface ApiResponse {
  success: boolean;
  submissionId?: string;
  message?: string;
  warning?: string;
  error?: string;
  details?: string;
}

const createSuccessResponse = (submissionId: string, warning?: string): NextResponse<ApiResponse> => {
  const response: ApiResponse = {
    success: true,
    submissionId,
    message: "Thanks — we will reply within one business day.",
  };
  
  if (warning) {
    response.warning = warning;
  }
  
  return NextResponse.json(response);
};

const createErrorResponse = (error: string, status: number, details?: string): NextResponse<ApiResponse> => {
  return NextResponse.json({ 
    success: false, 
    error,
    ...(details && { details })
  }, { status });
};

// Enhanced rate limiter with cleanup
const rateLimitStore: Map<string, number[]> = new Map();
const RATE_LIMIT_MAX = 5; // 5 submissions per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Cleanup old entries periodically to prevent memory leaks
const cleanupRateLimit = () => {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  
  for (const [ip, timestamps] of rateLimitStore.entries()) {
    const recent = timestamps.filter(ts => ts > cutoff);
    if (recent.length === 0) {
      rateLimitStore.delete(ip);
    } else {
      rateLimitStore.set(ip, recent);
    }
  }
};

// Run cleanup every 15 minutes
setInterval(cleanupRateLimit, 15 * 60 * 1000);

function getClientIp(req: Request): string {
  // Check multiple headers for IP
  const headers = [
    'x-forwarded-for',
    'x-real-ip',
    'x-client-ip',
    'cf-connecting-ip', // Cloudflare
    'true-client-ip'
  ];
  
  for (const header of headers) {
    const value = req.headers.get(header);
    if (value) {
      // Take the first IP in case of comma-separated list
      const ip = value.split(',')[0].trim();
      if (ip && ip !== 'unknown') return ip;
    }
  }
  
  return 'unknown';
}

// Input validation schema
interface ContactFormInput {
  name: string;
  email: string;
  company: string;
  purpose: string[];
  role?: string;
  message?: string;
  recaptchaToken: string;
  honeypot?: string;
  elapsedMs?: number;
  privacyConsent: boolean;
  marketingConsent?: boolean;
}

const validateInput = (data: any): { isValid: boolean; errors: string[]; sanitized?: ContactFormInput } => {
  const errors: string[] = [];
  
  // Required fields
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name is required and must be at least 2 characters');
  }
  
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Invalid email format');
    }
  }
  
  if (!data.company || typeof data.company !== 'string' || data.company.trim().length < 1) {
    errors.push('Company is required');
  }
  
  if (!Array.isArray(data.purpose) || data.purpose.length === 0) {
    errors.push('At least one purpose must be selected');
  }
  
  if (!data.recaptchaToken || typeof data.recaptchaToken !== 'string') {
    errors.push('reCAPTCHA token is required');
  }
  
  if (!data.privacyConsent) {
    errors.push('Privacy consent is required');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Sanitize and return validated data
  const sanitized: ContactFormInput = {
    name: data.name.trim(),
    email: data.email.trim().toLowerCase(),
    company: data.company.trim(),
    purpose: data.purpose.filter((p: any) => typeof p === 'string' && p.trim()),
    role: data.role ? data.role.trim() : undefined,
    message: data.message ? data.message.trim() : undefined,
    recaptchaToken: data.recaptchaToken.trim(),
    honeypot: data.honeypot || '',
    elapsedMs: typeof data.elapsedMs === 'number' ? data.elapsedMs : 0,
    privacyConsent: Boolean(data.privacyConsent),
    marketingConsent: Boolean(data.marketingConsent)
  };
  
  return { isValid: true, errors: [], sanitized };
};

const verifyRecaptcha = async (token: string): Promise<{ success: boolean; score?: number; error?: string }> => {
  if (!recaptchaSecretKey) {
    return { success: false, error: "Server configuration error: Missing reCAPTCHA secret" };
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Contact Form)"
      },
      body: `secret=${encodeURIComponent(recaptchaSecretKey)}&response=${encodeURIComponent(token)}`,
    });

    if (!response.ok) {
      return { success: false, error: "reCAPTCHA service unavailable" };
    }

    const result = await response.json();

    if (!result.success) {
      const errorCodes = result['error-codes'] || [];
      return { 
        success: false, 
        error: `reCAPTCHA verification failed: ${errorCodes.join(', ')}` 
      };
    }

    const score = result.score || 0;
    if (score < 0.5) {
      return { success: false, error: "Security verification failed" };
    }

    return { success: true, score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: "reCAPTCHA verification failed" };
  }
};

export async function POST(req: Request) {
  try {
    // Parse request body
    let data: any;
    try {
      data = await req.json();
    } catch (error) {
      return createErrorResponse("Invalid JSON in request body", 400);
    }

    // Validate input
    const validation = validateInput(data);
    if (!validation.isValid) {
      return createErrorResponse(
        "Validation failed", 
        400, 
        validation.errors.join('; ')
      );
    }

    const sanitizedData = validation.sanitized!;

    // Honeypot check - if filled, pretend success but don't process
    if (sanitizedData.honeypot && sanitizedData.honeypot.trim() !== "") {
      console.log('Honeypot triggered for IP:', getClientIp(req));
      return NextResponse.json({ success: true });
    }

    // Minimum time on form check (prevent bot submissions)
    if ((sanitizedData.elapsedMs ?? 0) < 3000) {
      return createErrorResponse("Submission too fast. Please try again.", 400);
    }

    // Rate limiting by IP
    const ip = getClientIp(req);
    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;
    const prior = rateLimitStore.get(ip) || [];
    const recent = prior.filter(ts => ts > windowStart);
    
    if (recent.length >= RATE_LIMIT_MAX) {
      return createErrorResponse("Too many submissions. Please try again later.", 429);
    }
    
    // Record this attempt
    recent.push(now);
    rateLimitStore.set(ip, recent);

    // Verify reCAPTCHA
    const recaptchaResult = await verifyRecaptcha(sanitizedData.recaptchaToken);
    if (!recaptchaResult.success) {
      return createErrorResponse(recaptchaResult.error || "Security verification failed", 403);
    }

    // Store in Sanity CMS
    let submission;
    try {
      submission = await client.create({
        _type: "contactSubmission",
        timestamp: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        company: sanitizedData.company,
        purpose: sanitizedData.purpose,
        role: sanitizedData.role || "",
        message: sanitizedData.message || "",
        privacyConsent: sanitizedData.privacyConsent,
        marketingConsent: sanitizedData.marketingConsent || false,
        recaptcha_score: recaptchaResult.score || 0,
        ip_address: ip, // Store for analytics (ensure GDPR compliance)
      });
    } catch (error) {
      console.error('Sanity submission error:', error);
      return createErrorResponse("Database error. Please try again.", 500);
    }

    console.log('=== CONTACT FORM PROCESSING ===');
    console.log('Submission ID:', submission._id);
    console.log('User:', sanitizedData.name, '(', sanitizedData.email, ')');
    console.log('Company:', sanitizedData.company);
    console.log('reCAPTCHA Score:', recaptchaResult.score);

    // Prepare contact data for Excel generation
    const contactData: ContactFormData = {
      name: sanitizedData.name,
      email: sanitizedData.email,
      company: sanitizedData.company,
      purpose: sanitizedData.purpose,
      role: sanitizedData.role,
      message: sanitizedData.message,
      timestamp: new Date().toISOString(),
      submissionId: submission._id,
      recaptchaScore: recaptchaResult.score || 0,
    };

    // Generate Excel files (non-blocking)
    let excelFileUrl = '';
    let masterExcelUrl = '';
    let excelGenerationSuccess = false;
    let excelError = '';

    try {
      excelFileUrl = generateContactExcel(contactData);
      masterExcelUrl = appendToMasterExcel(contactData);
      excelGenerationSuccess = true;
      
      console.log('Excel files generated:');
      console.log('- Individual file:', excelFileUrl);
      console.log('- Master file:', masterExcelUrl);
    } catch (error) {
      console.error('❌ Excel generation failed:', error);
      excelError = error instanceof Error ? error.message : 'Unknown error';
      excelGenerationSuccess = false;
    }
    
    // Prepare Excel download URLs
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_BASE_URL || 'https://zerobuild.vercel.app'
      : 'http://localhost:3000';
    
    const fullExcelUrl = excelGenerationSuccess 
      ? `${baseUrl}/api/download-excel/${excelFileUrl.split('/').pop()}` 
      : '';
    const fullMasterExcelUrl = excelGenerationSuccess 
      ? `${baseUrl}/api/download-excel/${masterExcelUrl.split('/').pop()}` 
      : '';

    // Verify email configuration
    const emailConfigVerified = await verifyEmailConfig();
    if (!emailConfigVerified) {
      console.warn('⚠️ Email configuration not verified');
      return createSuccessResponse(
        submission._id, 
        "Form submitted successfully, but email delivery may be delayed due to technical issues"
      );
    }

    // Prepare email content
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0;">Zero Build Website</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px;">
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #333;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold; width: 120px;">Name:</td>
                <td style="padding: 8px 0;">${sanitizedData.name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold;">Email:</td>
                <td style="padding: 8px 0;"><a href="mailto:${sanitizedData.email}">${sanitizedData.email}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold;">Company:</td>
                <td style="padding: 8px 0;">${sanitizedData.company}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold;">Role:</td>
                <td style="padding: 8px 0;">${sanitizedData.role || "Not specified"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold;">Purpose:</td>
                <td style="padding: 8px 0;">${sanitizedData.purpose.join(", ")}</td>
              </tr>
              <tr style="border-bottom: 1px solid #eee;">
                <td style="padding: 8px 0; font-weight: bold;">Privacy:</td>
                <td style="padding: 8px 0;">
                  ✅ Privacy consent: ${sanitizedData.privacyConsent ? 'Yes' : 'No'}<br>
                  📧 Marketing consent: ${sanitizedData.marketingConsent ? 'Yes' : 'No'}
                </td>
              </tr>
            </table>
          </div>
          
          ${sanitizedData.message ? `
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="margin-top: 0; color: #333;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${sanitizedData.message}</p>
          </div>
          ` : ''}
          
          ${excelGenerationSuccess ? `
          <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #2196f3;">
            <h3 style="margin-top: 0; color: #1976d2;">📊 Download Excel Files</h3>
            <div style="margin: 15px 0;">
              <a href="${fullExcelUrl}" style="background: #2196f3; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold; margin-right: 15px; margin-bottom: 10px;">
                📥 Individual Submission
              </a>
              <a href="${fullMasterExcelUrl}" style="background: #4caf50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                📊 Master File (All Submissions)
              </a>
            </div>
          </div>
          ` : `
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #ffc107;">
            <h3 style="margin-top: 0; color: #856404;">⚠️ Excel Generation Notice</h3>
            <p>Excel file generation failed: ${excelError}</p>
            <p style="font-size: 14px; color: #666;">Submission ID: ${submission._id}</p>
          </div>
          `}
          
          <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #6c757d;">
            <h4 style="margin-top: 0;">Technical Information</h4>
            <p style="font-size: 14px; color: #666; margin: 5px 0;">
              <strong>Submission ID:</strong> ${submission._id}<br>
              <strong>Timestamp:</strong> ${new Date().toLocaleString()}<br>
              <strong>reCAPTCHA Score:</strong> ${recaptchaResult.score}/1.0<br>
              <strong>Client IP:</strong> ${ip}
            </p>
          </div>
        </div>
      </div>
    `;

    const userConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
          <p style="margin: 15px 0 0 0; font-size: 16px; opacity: 0.9;">We've received your message and will respond within one business day.</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 25px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-top: 0; font-size: 20px;">Your Submission Summary</h2>
            <p><strong>Name:</strong> ${sanitizedData.name}</p>
            <p><strong>Email:</strong> ${sanitizedData.email}</p>
            <p><strong>Company:</strong> ${sanitizedData.company}</p>
            <p><strong>Inquiry Purpose:</strong> ${sanitizedData.purpose.join(", ")}</p>
            ${sanitizedData.role ? `<p><strong>Your Role:</strong> ${sanitizedData.role}</p>` : ''}
            ${sanitizedData.message ? `<p><strong>Your Message:</strong><br><em>${sanitizedData.message}</em></p>` : ''}
          </div>
          
          <div style="background: #e8f5e8; padding: 25px; border-radius: 8px; border-left: 4px solid #4caf50;">
            <h3 style="color: #2e7d32; margin-top: 0; font-size: 18px;">✅ What Happens Next?</h3>
            <ul style="color: #333; line-height: 1.8; margin: 0; padding-left: 20px;">
              <li>Our team will review your inquiry within 24 hours</li>
              <li>We'll respond with relevant information and next steps</li>
              <li>For urgent matters, feel free to follow up directly</li>
              <li>We may schedule a discovery call if appropriate</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #888; font-size: 13px; margin: 0;">
              This is an automated confirmation from Zero Build.<br>
              Reference ID: ${submission._id}
            </p>
          </div>
        </div>
      </div>
    `;

    // Send emails
    const emailPromises = [
      sendEmail({
        to: "deepak@zerobuild.io",
        replyTo: sanitizedData.email,
        subject: `New Contact: ${sanitizedData.name} from ${sanitizedData.company}`,
        html: adminEmailHtml,
      }),
      sendEmail({
        to: sanitizedData.email,
        subject: "Thank you for contacting Zero Build - Confirmation received",
        html: userConfirmationHtml,
      })
    ];

    const [adminEmailResult, userEmailResult] = await Promise.allSettled(emailPromises);
    
    // Check email results
    const warnings: string[] = [];
    if (adminEmailResult.status === 'rejected' || !adminEmailResult.value?.success) {
      console.error('Admin email failed:', adminEmailResult);
      warnings.push("Admin notification may be delayed");
    }
    if (userEmailResult.status === 'rejected' || !userEmailResult.value?.success) {
      console.error('User email failed:', userEmailResult);
      warnings.push("Confirmation email may be delayed");
    }

    console.log('✅ Contact form processing completed successfully!');
    
    if (warnings.length > 0) {
      return createSuccessResponse(
        submission._id, 
        `Form submitted successfully, but ${warnings.join(" and ")}. We'll still process your request promptly.`
      );
    }

    return createSuccessResponse(submission._id);

  } catch (error) {
    console.error("Unexpected error in contact form:", error);
    
    // Determine error type and response
    if (error instanceof Error) {
      if (error.message.includes('Missing environment variable')) {
        return createErrorResponse("Server configuration error", 500);
      }
      if (error.message.includes('Network') || error.message.includes('fetch')) {
        return createErrorResponse("Network error - please try again", 503);
      }
      if (error.message.includes('Sanity') || error.message.includes('Database')) {
        return createErrorResponse("Database error - please try again", 500);
      }
    }
    
    return createErrorResponse("Internal server error", 500, 
      process.env.NODE_ENV === 'development' 
        ? (error instanceof Error ? error.message : 'Unknown error')
        : undefined
    );
  }
}

// Optional: Health check endpoint
export async function GET() {
  try {
    // Check if essential services are available
    const emailConfigValid = await verifyEmailConfig();
    const sanityConnected = await client.fetch('count(*[_type == "contactSubmission"])').then(() => true).catch(() => false);
    
    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        email: emailConfigValid,
        database: sanityConnected,
        recaptcha: !!recaptchaSecretKey
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Health check failed'
    }, { status: 500 });
  }
}