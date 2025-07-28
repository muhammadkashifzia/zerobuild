import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { emailAppPassword } from "@/sanity/env";

export async function POST() {
  try {
    console.log('Testing email configuration...');
    console.log('Email password exists:', !!emailAppPassword);
    
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: "hello@zerobuild.io",
        pass: emailAppPassword,
      },
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log('SMTP connection verified successfully');

    const mailOptions = {
      from: "hello@zerobuild.io",
      to: "eastlogic.kashif@gmail.com",
      subject: "Test Email - Zero Build Contact Form",
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to verify the email configuration is working.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        <hr>
        <p><em>Sent via Zero Build Contact Form Test</em></p>
      `,
    };

    await transporter.sendMail(mailOptions);
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