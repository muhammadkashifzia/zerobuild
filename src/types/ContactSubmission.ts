export interface ContactSubmission {
  _id?: string;
  _type: "contactSubmission";
  timestamp: string;
  name: string;
  email: string;
  company: string;
  purpose: string[];
  role?: string;
  message?: string;
  recaptcha_score?: number;
}
