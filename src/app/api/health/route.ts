import { NextResponse } from "next/server";
import { recaptchaSecretKey, m365apppassword } from "@/sanity/env";

export async function GET() {
  try {
    const envCheck = {
      recaptchaSecretKey: !!recaptchaSecretKey,
      m365apppassword: !!m365apppassword,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      environment: envCheck,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 