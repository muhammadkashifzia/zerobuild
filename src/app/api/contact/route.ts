import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import nodemailer from "nodemailer";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";

const client = createClient(clientConfig);

export async function POST(req: Request) {
  try {
    console.log("=== CONTACT FORM SUBMISSION STARTED ===");
    const data = await req.json();
    console.log("Form data received:", { 
      name: data.name, 
      email: data.email, 
      company: data.company,
      purpose: data.purpose,
      role: data.role 
    });

    // 1. Honeypot check
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.log("Bot submission detected");
      return NextResponse.json({ success: true });
    }

    // 2. reCAPTCHA verification
    if (!data.recaptchaToken) {
      console.log("Missing reCAPTCHA token");
      return NextResponse.json({ success: false, error: "Missing reCAPTCHA token" }, { status: 400 });
    }

    console.log("Verifying reCAPTCHA...");
    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecretKey}&response=${data.recaptchaToken}`,
    });

    const recaptchaJson = await recaptchaResponse.json();
    console.log("reCAPTCHA response:", recaptchaJson);

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      console.log("reCAPTCHA verification failed");
      return NextResponse.json({ success: false, error: "Failed reCAPTCHA check" }, { status: 403 });
    }

    // 3. Store in Sanity
    console.log("Storing in Sanity...");
    const submission = await client.create({
      _type: "contactSubmission",
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company,
      purpose: data.purpose,     // array of purposes
      role: data.role || "",     // optional role
      message: data.message || "",
      recaptcha_score: recaptchaJson.score,
    });
    console.log("Sanity submission created:", submission._id);

    // 4. Send email via Microsoft 365 SMTP
    console.log("Setting up Microsoft 365 email...");
    
    if (!process.env.M365_APP_PASSWORD) {
      console.error("M365_APP_PASSWORD environment variable is missing");
      throw new Error("Email configuration is missing - M365_APP_PASSWORD not set");
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: "hello@zerobuild.io",
        pass: process.env.M365_APP_PASSWORD,
      },
      tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
      }
    });

    const mailOptions = {
      from: "hello@zerobuild.io", // Must match the auth user
      to: "hello@zerobuild.io",   // Recipient email
      subject: "📩 New Contact Form Submission - Zero Build",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Role:</strong> ${data.role || "Not specified"}</p>
          </div>
          
          <div style="background-color: #e9ecef; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #495057; margin-top: 0;">Purpose of Contact</h3>
            <p><strong>Interests:</strong> ${data.purpose?.join(", ") || "Not specified"}</p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Message</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${data.message}</p>
          </div>
          
          <div style="background-color: #d1ecf1; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0c5460; margin-top: 0;">Submission Details</h3>
            <p><strong>Submission ID:</strong> ${submission._id}</p>
            <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>reCAPTCHA Score:</strong> ${recaptchaJson.score}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
          <p style="color: #6c757d; font-size: 12px; text-align: center;">
            <em>This message was sent via the Zero Build Contact Form</em>
          </p>
        </div>
      `,
    };

    console.log("Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to hello@zerobuild.io");

    // 5. Final response
    console.log("=== CONTACT FORM SUBMISSION COMPLETED SUCCESSFULLY ===");
    return NextResponse.json({
      success: true,
      submissionId: submission._id,
      message: "Thanks for reaching out! We'll be in touch soon. In the meantime, check out our latest tools.",
      resourcesLink: "/resources",
    });

  } catch (error) {
    console.error("=== CONTACT FORM ERROR ===");
    console.error("Error submitting contact form:", error);
    
    // Log specific error details
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    
    // Check environment variables
    console.log("Environment check:");
    console.log("M365_APP_PASSWORD exists:", !!process.env.M365_APP_PASSWORD);
    console.log("SANITY_WRITE_TOKEN exists:", !!process.env.SANITY_WRITE_TOKEN);
    console.log("RECAPTCHA_SECRET_KEY exists:", !!process.env.RECAPTCHA_SECRET_KEY);
    
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}
