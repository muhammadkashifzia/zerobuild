# Email Configuration with STARTTLS Encryption

This project uses Microsoft 365 SMTP with STARTTLS encryption for secure email delivery.

## Configuration Overview

### STARTTLS Settings
- **Host**: `smtp.office365.com`
- **Port**: `587` (STARTTLS)
- **Security**: `requireTLS: true` - Explicitly requires TLS encryption
- **Ciphers**: `SSLv3` for compatibility
- **Certificate Validation**: Environment-dependent (stricter in production)

### Environment Variables
Make sure these environment variables are set:

```env
EMAIL_APP_PASSWORD=your_microsoft_365_app_password
```

## Email Utilities

### `src/utils/email.ts`

This centralized utility provides:

1. **`createEmailTransporter()`** - Creates a nodemailer transporter with STARTTLS
2. **`verifyEmailConfig()`** - Verifies SMTP connection
3. **`sendEmail(options)`** - Sends emails with standardized options

### Usage Example

```typescript
import { sendEmail } from "@/utils/email";

const result = await sendEmail({
  to: "recipient@example.com",
  subject: "Test Subject",
  html: "<h1>Hello World</h1>",
  replyTo: "sender@example.com" // optional
});

if (result.success) {
  console.log("Email sent successfully");
} else {
  console.error("Email failed:", result.error);
}
```

## API Routes

### Contact Form (`/api/contact`)
- Uses the email utility to send contact form submissions
- Includes reCAPTCHA verification
- Stores submissions in Sanity CMS

### Test Email (`/api/test-email`)
- Tests email configuration
- Verifies SMTP connection before sending
- Useful for debugging email issues

## Security Features

1. **STARTTLS Encryption**: All emails are encrypted in transit
2. **Environment Variables**: Sensitive data stored in environment variables
3. **Certificate Validation**: Stricter validation in production
4. **Error Handling**: Comprehensive error handling and logging

## Troubleshooting

### Common Issues

1. **Authentication Failed**
   - Verify `EMAIL_APP_PASSWORD` is correct
   - Ensure 2FA is enabled on Microsoft 365 account
   - Generate a new app password if needed

2. **Connection Timeout**
   - Check firewall settings
   - Verify port 587 is not blocked
   - Ensure network allows SMTP traffic

3. **Certificate Errors**
   - In development: `rejectUnauthorized: false`
   - In production: `rejectUnauthorized: true` (default)

### Testing

Use the test email endpoint to verify configuration:
```bash
curl -X POST http://localhost:3000/api/test-email
```

## Production Considerations

1. **Environment Variables**: Use proper environment variable management
2. **Certificate Validation**: Enable strict certificate validation
3. **Rate Limiting**: Implement rate limiting for email endpoints
4. **Monitoring**: Add email delivery monitoring and logging
5. **Backup**: Consider backup email service providers 