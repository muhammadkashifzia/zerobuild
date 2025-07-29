import { NextResponse } from "next/server";
import { sendEmail, verifyEmailConfig } from "@/utils/email";

export async function GET() {
  try {
    console.log('=== SMTP Email Test Started ===');
    
    // Test 1: Verify SMTP Configuration
    console.log('1. Testing SMTP Configuration...');
    const smtpTest = await verifyEmailConfig();
    console.log('SMTP Configuration test result:', smtpTest);
    
    if (!smtpTest) {
      return NextResponse.json({
        success: false,
        error: "SMTP configuration verification failed",
        step: "configuration_verification"
      }, { status: 500 });
    }
    
    // Test 2: Send Test Email
    console.log('2. Sending test email...');
    const emailResult = await sendEmail({
      to: "eastlogic.kashif@gmail.com",
      subject: "SMTP Test Email - Zero Build",
      html: `
        <h2>SMTP Test Email</h2>
        <p>This is a test email to verify SMTP functionality.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <p><strong>Test ID:</strong> ${Math.random().toString(36).substring(7)}</p>
        <hr>
        <p><em>This is an automated test from Zero Build</em></p>
      `,
    });
    
    console.log('Email test result:', emailResult);
    
    if (!emailResult.success) {
      return NextResponse.json({
        success: false,
        error: "Email sending failed",
        details: emailResult.details,
        step: "email_sending"
      }, { status: 500 });
    }
    
    // Test 3: Success Response
    console.log('3. All tests passed successfully!');
    return NextResponse.json({
      success: true,
      message: "SMTP email functionality is working correctly",
      messageId: emailResult.messageId,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('❌ SMTP Test failed:', error);
    return NextResponse.json({
      success: false,
      error: "Test failed with exception",
      details: error instanceof Error ? error.message : 'Unknown error',
      step: "exception"
    }, { status: 500 });
  }
} 