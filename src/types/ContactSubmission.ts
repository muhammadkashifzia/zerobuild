export interface ContactSubmission {
  _type: "contactSubmission";
  timestamp: string;
  name: string;
  email: string;
  company: string;
  purpose: string[];
  role?: string;
  message?: string;
}
