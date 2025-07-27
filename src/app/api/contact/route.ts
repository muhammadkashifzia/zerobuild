import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";

const client = createClient(clientConfig);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (data.honeypot && data.honeypot.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaToken = data.recaptchaToken;

    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
    });

    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success || recaptchaJson.score < 0.5) {
      return NextResponse.json(
        { success: false, error: "Failed reCAPTCHA check" },
        { status: 403 }
      );
    }

    await client.create({
      _type: "contactSubmission",
      timestamp: new Date().toISOString(),
      name: data.name,
      email: data.email,
      company: data.company,
      purpose: data.purpose,
      role: data.role || "",
      message: data.message || "",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
