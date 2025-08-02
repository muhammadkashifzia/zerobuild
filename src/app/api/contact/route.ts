import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";
import { sendEmail, verifyEmailConfig } from "@/utils/email";

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

    // Verify email configuration
    const emailConfigVerified = await verifyEmailConfig();
    if (!emailConfigVerified) {
      return createSuccessResponse(submission._id, "Email delivery may be delayed due to technical issues");
    }

    // Send email
    const emailResult = await sendEmail({
      to: "info@eastlogic.com",
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
        <hr>
        <p><em>Sent via Zero Build Contact Form</em></p>
      `,
    });

    if (!emailResult.success) {
      return createSuccessResponse(submission._id, "Email delivery may be delayed due to technical issues");
    }

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