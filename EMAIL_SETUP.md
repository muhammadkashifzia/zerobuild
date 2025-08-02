# Email Setup and Troubleshooting Guide

## Overview
The contact form uses Microsoft 365 SMTP to send emails when users submit the contact form. This guide helps you set up and troubleshoot email delivery issues.

## Configuration

### Environment Variables Required
Make sure these environment variables are set in your `.env.local` file:

```env
# Email Configuration
EMAIL_APP_PASSWORD=your_microsoft_365_app_password

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
SANITY_WRITE_TOKEN=your_sanity_write_token
```

### Microsoft 365 App Password Setup
1. Go to your Microsoft 365 account settings
2. Enable 2-factor authentication if not already enabled
3. Generate an app password for "info@eastlogic.com"
4. Use this app password as the `EMAIL_APP_PASSWORD` environment variable

## Testing Email Configuration

### 1. Check Email Status
Visit `/api/email-status` to check if all environment variables are configured and SMTP connection is working.

### 2. Send Test Email
Send a POST request to `/api/test-email` to test email delivery.

### 3. Test Contact Form
Submit the contact form at `/contact` to test the complete flow.

## Troubleshooting

### Common Issues

#### 1. "SMTP connection failed"
- Check if `EMAIL_APP_PASSWORD` is set correctly
- Verify the app password is valid and not expired
- Ensure the Microsoft 365 account has SMTP access enabled

#### 2. "reCAPTCHA verification failed"
- Check if reCAPTCHA keys are configured correctly
- Verify the domain is added to reCAPTCHA settings
- Ensure the keys match between frontend and backend

#### 3. "Email sending failed"
- Check server logs for detailed error messages
- Verify SMTP settings in the email utility
- Test with a different email address

#### 4. Form submission succeeds but no email received
- Check spam/junk folders
- Verify the recipient email address
- Check if email is being blocked by firewall/antivirus

### Debug Steps

1. **Check Environment Variables**
   ```bash
   # Visit in browser
   http://localhost:3000/api/email-status
   ```

2. **Test SMTP Connection**
   ```bash
   # Send POST request to
   http://localhost:3000/api/test-email
   ```

3. **Check Server Logs**
   - Look for console.log messages in the terminal
   - Check for error messages in the browser console

4. **Verify reCAPTCHA**
   - Check browser console for reCAPTCHA errors
   - Verify the site key is loaded correctly

## Email Configuration Details

### SMTP Settings
- **Host**: smtp.office365.com
- **Port**: 587
- **Security**: STARTTLS
- **Authentication**: Username/Password

### Email Headers
The system adds these headers for better deliverability:
- `X-Priority: 1`
- `X-MSMail-Priority: High`
- `Importance: high`

### Fallback Behavior
If email sending fails:
1. The form submission is still saved to Sanity CMS
2. User receives a success message
3. A warning is logged about email delivery issues
4. The submission can be retrieved from Sanity later

## Security Considerations

1. **App Passwords**: Use app passwords instead of regular passwords
2. **Environment Variables**: Never commit sensitive data to version control
3. **reCAPTCHA**: Always verify reCAPTCHA tokens on the server
4. **Rate Limiting**: Consider implementing rate limiting for the contact form

## Monitoring

### Logs to Monitor
- SMTP connection verification
- Email sending success/failure
- reCAPTCHA verification results
- Form submission data

### Metrics to Track
- Form submission success rate
- Email delivery success rate
- reCAPTCHA failure rate
- Average response time

## Support

If you continue to experience issues:
1. Check the server logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with the provided debugging endpoints
4. Contact your email provider for SMTP-specific issues 