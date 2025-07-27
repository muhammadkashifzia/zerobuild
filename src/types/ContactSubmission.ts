// types/ContactSubmission.ts

export type ContactSubmission = {
  name: string;
  email: string;
  company: string;
  message: string;
  purpose: string[];
  role?: string;
  honeypot?: string;
};
