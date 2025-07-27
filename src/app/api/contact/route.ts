import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import nodemailer from "nodemailer";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";

const client = createClient(clientConfig);

export async function POST(req: Request) {
  try {
    console.log("Contact form submission started");
    const data = await req.json();
    console.log("Form data received:", { name: data.name, email: data.email, company: data.company });

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

    // 4. Send email - Try multiple email configurations
    console.log("Setting up email...");
    let emailSent = false;
    let emailError = null;

    // Try Gmail first
    if (process.env.GMAIL_APP_PASSWORD) {
      try {
        console.log("Attempting Gmail email...");
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: "eastlogic.kashif@gmail.com",
            pass: process.env.GMAIL_APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: "eastlogic.kashif@gmail.com",
          to: "eastlogic.kashif@gmail.com",
          subject: "📩 New Contact Form Submission - Zero Build",
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Message:</strong><br>${data.message}</p>
            <p><strong>Purpose:</strong> ${data.purpose?.join(", ")}</p>
            <p><strong>Role:</strong> ${data.role || "N/A"}</p>
            <p><strong>reCAPTCHA Score:</strong> ${recaptchaJson.score}</p>
            <hr>
            <p><em>Sent via Zero Build Contact Form</em></p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log("Gmail email sent successfully");
      } catch (gmailError) {
        console.error("Gmail email failed:", gmailError);
        emailError = gmailError;
      }
    }

    // Try M365 if Gmail failed
    if (!emailSent && process.env.M365_APP_PASSWORD) {
      try {
        console.log("Attempting M365 email...");
        const transporter = nodemailer.createTransport({
          host: "smtp.office365.com",
          port: 587,
          secure: false,
          auth: {
            user: "hello@zerobuild.io",
            pass: process.env.M365_APP_PASSWORD,
          },
        });

        const mailOptions = {
          from: "hello@zerobuild.io",
          to: "hello@zerobuild.io",
          subject: "📩 New Contact Form Submission - Zero Build",
          html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Company:</strong> ${data.company}</p>
            <p><strong>Message:</strong><br>${data.message}</p>
            <p><strong>Purpose:</strong> ${data.purpose?.join(", ")}</p>
            <p><strong>Role:</strong> ${data.role || "N/A"}</p>
            <p><strong>reCAPTCHA Score:</strong> ${recaptchaJson.score}</p>
            <hr>
            <p><em>Sent via Zero Build Contact Form</em></p>
          `,
        };

        await transporter.sendMail(mailOptions);
        emailSent = true;
        console.log("M365 email sent successfully");
      } catch (m365Error) {
        console.error("M365 email failed:", m365Error);
        emailError = m365Error;
      }
    }

    // If no email was sent, log the error but don't fail the submission
    if (!emailSent) {
      console.error("All email attempts failed:", emailError);
      console.log("Continuing without email notification...");
    }

    // 5. Final response
    console.log("Contact form submission completed successfully");
    return NextResponse.json({
      success: true,
      submissionId: submission._id,
      emailSent: emailSent,
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
    console.log("GMAIL_APP_PASSWORD exists:", !!process.env.GMAIL_APP_PASSWORD);
    console.log("M365_APP_PASSWORD exists:", !!process.env.M365_APP_PASSWORD);
    console.log("SANITY_WRITE_TOKEN exists:", !!process.env.SANITY_WRITE_TOKEN);
    
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}
