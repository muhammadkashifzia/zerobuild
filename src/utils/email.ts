import nodemailer from "nodemailer";
import { emailAppPassword } from "@/sanity/env";

export const createEmailTransporter = () => {
  return nodemailer.createTransport({
    host: "mail.eastlogic.com",
    port: 587,
    secure: true,
    auth: {
      user: "info@eastlogic.com",
      pass: emailAppPassword,
    },
    tls: {
      rejectUnauthorized: process.env.NODE_ENV === 'production'
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
  });
};

export const verifyEmailConfig = async () => {
  const transporter = createEmailTransporter();
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    console.error('SMTP verification failed:', error);
    return false;
  }
};

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: "info@eastlogic.com",
    replyTo: options.replyTo,
    to: options.to,
    subject: options.subject,
    html: options.html,
    headers: {
      'X-Priority': '1',
      'X-MSMail-Priority': 'High',
      'Importance': 'high'
    }
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
}; 