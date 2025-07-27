import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import nodemailer from "nodemailer";
import clientConfig from "@/sanity/config/client-config";
import { recaptchaSecretKey } from "@/sanity/env";

const client = createClient(clientConfig);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // 1. Honeypot check
    if (data.honeypot && data.honeypot.trim() !== "") {
      console.log("Bot submission detected");
      return NextResponse.json({ success: true });
    }

    // 2. reCAPTCHA verification
    if (!data.recaptchaToken) {
      return NextResponse.json({ success: false, error: "Missing reCAPTCHA token" }, { status: 400 });
    }

    const recaptchaResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecretKey}&response=${data.recaptchaToken}`,
    });

    const recaptchaJson = await recaptchaResponse.json();

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      return NextResponse.json({ success: false, error: "Failed reCAPTCHA check" }, { status: 403 });
    }

    // 3. Store in Sanity
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

    // 4. Send email via Microsoft 365 SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.muumuu-mail.com",
      port: 587,
      secure: false,
      auth: {
        user: "eastlogic.kashif@gmail.com",
        pass: process.env.M365_APP_PASSWORD!, // ✅ Set this in your Vercel project settings
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

    // 5. Final response with personality
    return NextResponse.json({
      success: true,
      submissionId: submission._id,
      message: "Thanks for reaching out! We’ll be in touch soon. In the meantime, check out our latest tools.",
      resourcesLink: "/resources",
    });

  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
