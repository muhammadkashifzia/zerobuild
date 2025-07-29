import nodemailer from "nodemailer";
import { emailAppPassword } from "@/sanity/env";

// Create a reusable email transporter with STARTTLS encryption
export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp.muumuu-mail.com",
    port: 993,
    secure: true, // STARTTLS is used on port 587
    auth: {
      user: "kashif@idenbrid.com",
      pass: emailAppPassword,
    },
  });
};

// Verify email configuration
export const verifyEmailConfig = async () => {
  const transporter = createEmailTransporter();
  try {
    await transporter.verify();
    console.log('SMTP connection verified successfully');
    return true;
  } catch (error) {
    console.error('SMTP verification failed:', error);
    return false;
  }
};

// Send email with standardized options
export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: "kashif@idenbrid.com",
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', options.to);
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
}; 