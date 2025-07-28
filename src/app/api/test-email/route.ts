import { NextResponse } from "next/server";
import { verifyEmailConfig, sendEmail } from "@/utils/email";

export async function POST() {
  try {
    console.log('Testing email configuration...');
    
    // Verify SMTP connection
    const isVerified = await verifyEmailConfig();
    if (!isVerified) {
      return NextResponse.json({
        success: false,
        error: "SMTP connection verification failed",
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    const emailResult = await sendEmail({
      to: "eastlogic.kashif@gmail.com",
      subject: "Test Email - Zero Build Contact Form",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration is working.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>Sent via Zero Build Contact Form Test</em></p>
      `,
    });

    if (!emailResult.success) {
      return NextResponse.json({
        success: false,
        error: emailResult.error,
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }

    console.log('Test email sent successfully');

    return NextResponse.json({
      success: true,
      message: "Test email sent successfully",
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("Test email failed:", error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 