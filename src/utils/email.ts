import nodemailer from "nodemailer";
import { emailAppPassword } from "@/sanity/env";

export const createEmailTransporter = () => {
  // SMTP Configuration - Fixed for port 587
  const smtpConfig = {
    host: "mail.eastlogic.com",
    port: 587,
    secure: false, // Changed from true to false for port 587
    auth: {
      user: "info@eastlogic.com",
      pass: "]H;l$VomAa)TAH&A",
    },
    tls: {
      rejectUnauthorized: false, // Changed to false for development
      ciphers: 'SSLv3'
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
    debug: true, // Enable debug output
    logger: true // Enable logging
  };

  // Debug: Print SMTP configuration (masking password)
  console.log('=== SMTP CONFIGURATION DEBUG ===');
  console.log('Host:', smtpConfig.host);
  console.log('Port:', smtpConfig.port);
  console.log('Secure:', smtpConfig.secure);
  console.log('User:', smtpConfig.auth.user);
  console.log('Password:', smtpConfig.auth.pass ? '[MASKED]' : 'NOT SET');
  console.log('TLS rejectUnauthorized:', smtpConfig.tls.rejectUnauthorized);
  console.log('TLS ciphers:', smtpConfig.tls.ciphers);
  console.log('Debug enabled:', smtpConfig.debug);
  console.log('Logger enabled:', smtpConfig.logger);
  console.log('Connection Timeout:', smtpConfig.connectionTimeout);
  console.log('Greeting Timeout:', smtpConfig.greetingTimeout);
  console.log('Socket Timeout:', smtpConfig.socketTimeout);
  console.log('Environment:', process.env.NODE_ENV);
  console.log('================================');

  return nodemailer.createTransport(smtpConfig);
};

// Alternative configurations for testing
export const createAlternativeTransporter = (configType: 'ssl' | 'tls' | 'starttls' = 'tls') => {
  const configs = {
    ssl: {
      host: "mail.eastlogic.com",
      port: 587,
      secure: true,
      auth: {
        user: "info@eastlogic.com",
        pass: "]H;l$VomAa)TAH&A",
      },
      tls: { rejectUnauthorized: false }
    },
    tls: {
      host: "mail.eastlogic.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@eastlogic.com",
        pass: "]H;l$VomAa)TAH&A",
      },
      tls: { rejectUnauthorized: false }
    },
    starttls: {
      host: "mail.eastlogic.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@eastlogic.com",
        pass: "]H;l$VomAa)TAH&A",
      },
      tls: { rejectUnauthorized: false },
      requireTLS: true
    }
  };

  console.log(`=== ALTERNATIVE SMTP CONFIG (${configType.toUpperCase()}) ===`);
  console.log('Config:', configs[configType]);
  console.log('================================');

  return nodemailer.createTransport(configs[configType]);
};

export const verifyEmailConfig = async () => {
  console.log('=== SMTP VERIFICATION START ===');
  const transporter = createEmailTransporter();
  
  try {
    console.log('Attempting to verify SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP verification successful!');
    console.log('=== SMTP VERIFICATION END ===');
    return true;
  } catch (error) {
    console.error('❌ SMTP verification failed:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      command: (error as any)?.command,
      responseCode: (error as any)?.responseCode,
      response: (error as any)?.response
    });
    
    // Try alternative configurations
    console.log('🔄 Trying alternative SMTP configurations...');
    
    const alternatives = ['ssl', 'tls', 'starttls'] as const;
    for (const alt of alternatives) {
      try {
        console.log(`Testing ${alt.toUpperCase()} configuration...`);
        const altTransporter = createAlternativeTransporter(alt);
        await altTransporter.verify();
        console.log(`✅ ${alt.toUpperCase()} configuration works!`);
        console.log('=== SMTP VERIFICATION END ===');
        return true;
      } catch (altError) {
        console.error(`❌ ${alt.toUpperCase()} configuration failed:`, altError);
      }
    }
    
    console.log('=== SMTP VERIFICATION END ===');
    return false;
  }
};

export const sendEmail = async (options: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) => {
  console.log('=== EMAIL SENDING START ===');
  console.log('Email options:', {
    to: options.to,
    subject: options.subject,
    replyTo: options.replyTo,
    htmlLength: options.html.length
  });
  
  const transporter = createEmailTransporter();
  
  const mailOptions = {
    from: "deepak@zerobuild.io",
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

  console.log('Mail options prepared:', {
    from: mailOptions.from,
    to: mailOptions.to,
    subject: mailOptions.subject,
    replyTo: mailOptions.replyTo
  });

  try {
    console.log('Attempting to send email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Response:', result.response);
    console.log('Accepted recipients:', result.accepted);
    console.log('Rejected recipients:', result.rejected);
    console.log('=== EMAIL SENDING END ===');
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('❌ Email sending failed:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: (error as any)?.code,
      command: (error as any)?.command,
      responseCode: (error as any)?.responseCode,
      response: (error as any)?.response,
      errno: (error as any)?.errno,
      syscall: (error as any)?.syscall,
      hostname: (error as any)?.hostname,
      port: (error as any)?.port
    });
    console.log('=== EMAIL SENDING END ===');
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown email error' 
    };
  }
}; 