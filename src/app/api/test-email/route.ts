import { NextResponse } from "next/server";
import { verifyEmailConfig, sendEmail } from "@/utils/email";

export async function POST() {
  console.log('=== TEST EMAIL API CALLED ===');
  console.log('Timestamp:', new Date().toISOString());
  console.log('Environment:', process.env.NODE_ENV);
  
  try {
    console.log('Testing SMTP connection...');
    const connectionVerified = await verifyEmailConfig();
    
    if (!connectionVerified) {
      console.log('❌ SMTP connection test failed');
      return NextResponse.json({ 
        success: false, 
        error: "SMTP connection failed",
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

    console.log('✅ SMTP connection test passed, sending test email...');
    const emailResult = await sendEmail({
      to: "info@eastlogic.com",
      subject: "Test Email - Zero Build Contact Form",
      html: `
        <h2>Test Email - Contact Form Verification</h2>
        <p>This is a test email to verify the email configuration for the contact form.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV}</p>
        <p><strong>SMTP Host:</strong> mail.eastlogic.com</p>
        <p><strong>SMTP Port:</strong> 587</p>
        <hr>
        <p><em>Sent via Zero Build Test Email Endpoint</em></p>
      `,
    });

    if (emailResult.success) {
      console.log('✅ Test email sent successfully');
      return NextResponse.json({
        success: true,
        message: "Test email sent successfully",
        messageId: emailResult.messageId,
        timestamp: new Date().toISOString()
      });
    } else {
      console.log('❌ Test email failed:', emailResult.error);
      return NextResponse.json({
        success: false,
        error: emailResult.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }

  } catch (error) {
    console.error("❌ Test email error:", error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
} 