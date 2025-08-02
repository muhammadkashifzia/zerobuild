import { NextResponse } from "next/server";
import { verifyEmailConfig } from "@/utils/email";

export async function GET() {
  try {
    const envCheck = {
      emailAppPassword: !!process.env.EMAIL_APP_PASSWORD,
      recaptchaSecretKey: !!process.env.RECAPTCHA_SECRET_KEY,
      recaptchaSiteKey: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      sanityProjectId: !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      sanityWriteToken: !!process.env.SANITY_WRITE_TOKEN,
    };

    const smtpVerified = await verifyEmailConfig();

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      smtp: {
        verified: smtpVerified,
        host: "smtp.office365.com",
        port: 587,
        user: "hello@zerobuild.io"
      },
      environmentVariables: envCheck,
      allConfigured: Object.values(envCheck).every(Boolean) && smtpVerified
    });

  } catch (error) {
    console.error("Email status check error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 