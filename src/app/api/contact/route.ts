import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import nodemailer from "nodemailer";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey, m365apppassword } from "@/sanity/env";

const client = createClient(clientConfig);
console.log('Sanity client configured with projectId:', clientConfig.projectId);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    console.log('Received data keys:', Object.keys(data));
    console.log('Environment check - recaptchaSecretKey exists:', !!recaptchaSecretKey);
    console.log('Environment check - m365apppassword exists:', !!m365apppassword);

    // 1. Honeypot check
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.log("Bot submission detected");
      return NextResponse.json({ success: true });
    }

    // 2. reCAPTCHA verification with improved validation
    if (!data.recaptchaToken || typeof data.recaptchaToken !== 'string' || data.recaptchaToken.trim() === '') {
      console.log('Invalid reCAPTCHA token:', typeof data.recaptchaToken, data.recaptchaToken?.length);
      return NextResponse.json({ success: false, error: "Invalid reCAPTCHA token" }, { status: 400 });
    }

    const cleanToken = data.recaptchaToken.trim();
    console.log('reCAPTCHA token length:', cleanToken.length);
    console.log('reCAPTCHA token preview:', cleanToken.substring(0, 50) + '...');

    // Verify secret key exists
    if (!recaptchaSecretKey) {
      console.error('reCAPTCHA secret key not found');
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
      console.error('reCAPTCHA API request failed:', recaptchaResponse.status, recaptchaResponse.statusText);
      return NextResponse.json({ success: false, error: "reCAPTCHA verification failed" }, { status: 500 });
    }

    const recaptchaJson = await recaptchaResponse.json();
    console.log('reCAPTCHA response:', recaptchaJson);

    if (!recaptchaJson.success) {
      console.error('reCAPTCHA verification failed:', recaptchaJson['error-codes']);
      return NextResponse.json({ 
        success: false, 
        error: "Failed reCAPTCHA check",
        details: recaptchaJson['error-codes']
      }, { status: 403 });
    }

    if (recaptchaJson.score < 0.5) {
      console.log('reCAPTCHA score too low:', recaptchaJson.score);
      return NextResponse.json({ success: false, error: "Security check failed" }, { status: 403 });
    }

    // 3. Store in Sanity
    console.log('Attempting to create Sanity submission...');
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
    console.log('Sanity submission created successfully:', submission._id);

    // 4. Send email via Microsoft 365 SMTP
    console.log('Attempting to send email...');
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "hello@zerobuild.io",
        pass: m365apppassword,
      },
    });

    const mailOptions = {
      from: "hello@zerobuild.io", // Use the authenticated email address
      replyTo: data.email, // Allow replies to go to the submitter
      to: "eastlogic.kashif@gmail.com",
      subject: "New Contact Form Submission - Zero Build",
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

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with the response even if email fails
      // The submission was already saved to Sanity
    }

    // 5. Final response
    return NextResponse.json({
      success: true,
      submissionId: submission._id,
      message: "Thanks for reaching out! We'll be in touch soon. In the meantime, check out our latest tools.",
      resourcesLink: "/resources",
    });

  } catch (error) {
    console.error("Error submitting contact form:", error);
    
    // Provide more specific error messages based on the error type
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