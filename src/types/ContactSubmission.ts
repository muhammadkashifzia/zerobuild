export interface ContactSubmission {
  _type: "contactSubmission";
  name: string;
  email: string;
  company: string;
  purpose: string[];  // multi-option selector
  role?: string;
  message?: string;
  honeypot?: string;
  recaptchaToken: string;
}
