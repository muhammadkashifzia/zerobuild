import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";
import { sendEmail, verifyEmailConfig } from "@/utils/email";
import { generateContactExcel, appendToMasterExcel, ContactFormData } from "@/utils/excel";

const client = createClient(clientConfig);

const createSuccessResponse = (submissionId: string, warning?: string) => {
  const response: any = {
    success: true,
    submissionId,
    message: "Thanks for reaching out! We'll be in touch soon. In the meantime, check out our latest tools.",
    resourcesLink: "/resources",
  };
  
  if (warning) {
    response.warning = warning;
  }
  
  return NextResponse.json(response);
};

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Honeypot check
    if (data.honeypot && data.honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    // reCAPTCHA verification
    if (!data.recaptchaToken || typeof data.recaptchaToken !== 'string' || data.recaptchaToken.trim() === '') {
      return NextResponse.json({ success: false, error: "Invalid reCAPTCHA token" }, { status: 400 });
    }

    const cleanToken = data.recaptchaToken.trim();

    if (!recaptchaSecretKey) {
      return NextResponse.json({ success: false, error: "Server configuration error" }, { status: 500 });
    }

    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (compatible; Next.js Contact Form)"
      },
      body: `secret=${encodeURIComponent(recaptchaSecretKey)}&response=${encodeURIComponent(cleanToken)}`,
    });

    if (!recaptchaResponse.ok) {
      return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 500 });
    }

    const recaptchaJson = await recaptchaResponse.json();

    if (!recaptchaJson.success) {
      return NextResponse.json({ 
        success: false, 
        error: "Failed reCAPTCHA check",
        details: recaptchaJson['error-codes']
      }, { status: 403 });
    }

    if (recaptchaJson.score < 0.5) {
      return NextResponse.json({ success: false, error: "Security check failed" }, { status: 403 });
    }

    // Store in Sanity
    const submission = await client.create({
      _type: "contactSubmission",
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company,
      purpose: data.purpose,
      role: data.role || "",
      message: data.message || "",
      recaptcha_score: recaptchaJson.score,
    });

    // Generate Excel file with user data
    const contactData: ContactFormData = {
      name: data.name,
      email: data.email,
      company: data.company,
      purpose: data.purpose,
      role: data.role,
      message: data.message,
      timestamp: new Date().toISOString(),
      submissionId: submission._id,
      recaptchaScore: recaptchaJson.score,
    };

    console.log('=== CONTACT FORM PROCESSING ===');
    console.log('Submission ID:', submission._id);
    console.log('User:', data.name, '(', data.email, ')');
    console.log('Company:', data.company);

    // Generate individual Excel file
    let excelFileUrl = '';
    let masterExcelUrl = '';
    let excelGenerationSuccess = false;

    try {
      excelFileUrl = generateContactExcel(contactData);
      masterExcelUrl = appendToMasterExcel(contactData);
      excelGenerationSuccess = true;
      
      console.log('Excel files generated:');
      console.log('- Individual file:', excelFileUrl);
      console.log('- Master file:', masterExcelUrl);
    } catch (error) {
      console.error('❌ Excel generation failed:', error);
      excelGenerationSuccess = false;
      // Continue with form submission even if Excel generation fails
    }
    
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://zerobuild.vercel.app' 
      : 'http://localhost:3000';
    const fullExcelUrl = excelGenerationSuccess ? `${baseUrl}/api/download-excel/${excelFileUrl.split('/').pop()}` : '';
    const fullMasterExcelUrl = excelGenerationSuccess ? `${baseUrl}/api/download-excel/${masterExcelUrl.split('/').pop()}` : '';

    // Verify email configuration
    const emailConfigVerified = await verifyEmailConfig();
    if (!emailConfigVerified) {
      return createSuccessResponse(submission._id, "Email delivery may be delayed due to technical issues");
    }

    // Send email to admin with Excel download links (if available)
    const adminEmailResult = await sendEmail({
      to: "deepak@zerobuild.io",
      replyTo: data.email,
      subject: "New Contact Form Submission - Zero Build",
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Company:</strong> ${data.company}</p>
        <p><strong>Message:</strong><br>${data.message || "No message provided"}</p>
        <p><strong>Purpose:</strong> ${data.purpose?.join(", ")}</p>
        <p><strong>Role:</strong> ${data.role || "N/A"}</p>
        <p><strong>reCAPTCHA Score:</strong> ${recaptchaJson.score}</p>
        <p><strong>Submission ID:</strong> ${submission._id}</p>
        
        ${excelGenerationSuccess ? `
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #007bff;">
          <h3 style="margin-top: 0; color: #007bff;">📊 Download Contact Data</h3>
          <p>Click the links below to download the contact form data:</p>
          <div style="margin: 15px 0;">
            <a href="${fullExcelUrl}" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold; margin-right: 10px;">
              📥 Individual Excel File
            </a>
            <a href="${fullMasterExcelUrl}" style="background: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              📊 Master Excel File (All Submissions)
            </a>
          </div>
          <p style="margin-top: 10px; font-size: 12px; color: #666;">
            Individual file contains this submission only. Master file contains all submissions.
          </p>
        </div>
        ` : `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h3 style="margin-top: 0; color: #856404;">⚠️ Excel Generation Notice</h3>
          <p>Excel file generation was not available for this submission, but the form data has been stored in the database.</p>
          <p style="margin-top: 10px; font-size: 12px; color: #666;">
            Submission ID: ${submission._id} - Data is available in Sanity CMS.
          </p>
        </div>
        `}
        
        <hr>
        <p><em>Sent via Zero Build Contact Form</em></p>
      `,
    });

    // Send confirmation email to user WITHOUT Excel download link
    const userEmailResult = await sendEmail({
      to: data.email,
      subject: "Thank you for contacting Zero Build - We've received your message",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">Thank You!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">We've received your message and will get back to you soon.</p>
          </div>
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Message Received</h2>
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Company:</strong> ${data.company}</p>
              ${data.message ? `<p><strong>Your Message:</strong><br>${data.message}</p>` : ''}
              <p><strong>Purpose:</strong> ${data.purpose?.join(", ")}</p>
              ${data.role ? `<p><strong>Role:</strong> ${data.role}</p>` : ''}
            </div>
            <div style="background: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0;">What happens next?</h3>
              <ul style="color: #333; line-height: 1.6;">
                <li>Our team will review your message within 24 hours</li>
                <li>We'll respond to your inquiry with relevant information</li>
                <li>If you have urgent questions, feel free to follow up</li>
              </ul> 
            </div>
            <div style="text-align: center; margin-top: 30px;">
              <p style="color: #888; font-size: 13px;">This is an automated confirmation. No need to reply.</p>
            </div>
          </div>
        </div>
      `,
    });

    // Check if either email failed
    if (!adminEmailResult.success || !userEmailResult.success) {
      const warnings = [];
      if (!adminEmailResult.success) warnings.push("Admin notification failed");
      if (!userEmailResult.success) warnings.push("User confirmation failed");
      
      return createSuccessResponse(
        submission._id, 
        `Form submitted successfully, but ${warnings.join(" and ")}. We'll still process your request.`
      );
    }

    console.log('✅ Contact form processing completed successfully!');
    return createSuccessResponse(submission._id);

  } catch (error) {
    console.error("Error submitting contact form:", error);
    
    let errorMessage = "Internal server error";
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes('Missing environment variable')) {
        errorMessage = "Server configuration error";
        statusCode = 500;
      } else if (error.message.includes('Network') || error.message.includes('fetch')) {
        errorMessage = "Network error - please try again";
        statusCode = 503;
      } else if (error.message.includes('Sanity')) {
        errorMessage = "Database error - please try again";
        statusCode = 500;
      }
    }
    
    return NextResponse.json({ 
      success: false, 
      error: errorMessage,
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: statusCode });
  }
}