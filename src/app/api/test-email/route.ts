import { NextResponse } from "next/server";
import { verifyEmailConfig, sendEmail } from "@/utils/email";

export async function POST() {
  try {
    // First, verify the SMTP connection
    console.log('Testing SMTP connection...');
    const connectionVerified = await verifyEmailConfig();
    
    if (!connectionVerified) {
      return NextResponse.json({ 
        success: false, 
        error: "SMTP connection failed" 
      }, { status: 500 });
    }

    // Send a test email
    console.log('Sending test email...');
    const emailResult = await sendEmail({
      to: "kashif@idenbrid.com",
      subject: "Test Email - Zero Build",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        <hr>
        <p><em>Sent via Zero Build Test Email Endpoint</em></p>
      `,
    });

    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully",
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        error: emailResult.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Test email error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 