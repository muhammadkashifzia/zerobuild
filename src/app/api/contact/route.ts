import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";

const client = createClient(clientConfig);

export async function POST(req: Request) {
  try {
    console.log("=== CONTACT FORM SUBMISSION STARTED ===");
    
    // Check environment variables first
    console.log("Environment check:");
    console.log("SANITY_WRITE_TOKEN exists:", !!process.env.SANITY_WRITE_TOKEN);
    console.log("RECAPTCHA_SECRET_KEY exists:", !!process.env.RECAPTCHA_SECRET_KEY);
    console.log("NODE_ENV:", process.env.NODE_ENV);
    
    // If critical environment variables are missing, return error
    if (!process.env.SANITY_WRITE_TOKEN) {
      console.error("SANITY_WRITE_TOKEN is missing");
      return NextResponse.json({ 
        success: false, 
        error: "Server configuration error. Please contact support." 
      }, { status: 500 });
    }
    
    if (!process.env.RECAPTCHA_SECRET_KEY) {
      console.error("RECAPTCHA_SECRET_KEY is missing");
      return NextResponse.json({ 
        success: false, 
        error: "Server configuration error. Please contact support." 
      }, { status: 500 });
    }
    
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
    let recaptchaJson;
    try {
      const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecretKey}&response=${data.recaptchaToken}`,
      });

      recaptchaJson = await recaptchaResponse.json();
      console.log("reCAPTCHA response:", recaptchaJson);

      if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
        console.log("reCAPTCHA verification failed");
        return NextResponse.json({ success: false, error: "Failed reCAPTCHA check" }, { status: 403 });
      }
    } catch (recaptchaError) {
      console.error("reCAPTCHA verification error:", recaptchaError);
      return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 500 });
    }

    // 3. Store in Sanity
    console.log("Storing in Sanity...");
    let submission;
    try {
      submission = await client.create({
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
    } catch (sanityError) {
      console.error("Sanity submission error:", sanityError);
      return NextResponse.json({ 
        success: false, 
        error: "Failed to save submission. Please try again." 
      }, { status: 500 });
    }

    // 4. Skip email for now - just log the data
    console.log("Email would be sent with data:", {
      name: data.name,
      email: data.email,
      company: data.company,
      message: data.message,
      purpose: data.purpose,
      role: data.role
    });

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
    
    return NextResponse.json({ 
      success: false, 
      error: "Internal server error. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : 'Unknown error' : undefined
    }, { status: 500 });
  }
}
