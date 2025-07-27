import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
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

      // optionally, store metadata
      recaptcha_score: recaptchaJson.score,
    });

    return NextResponse.json({ success: true, submissionId: submission._id });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
