import * as XLSX from 'xlsx';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  purpose: string[];
  role?: string;
  message?: string;
  timestamp: string;
  submissionId: string;
  recaptchaScore: number;
}

export const generateContactExcel = (data: ContactFormData): string => {
  // Create data for Excel
  const excelData = [
    {
      'Submission ID': data.submissionId,
      'Timestamp': data.timestamp,
      'Name': data.name,
      'Email': data.email,
      'Company': data.company,
      'Purpose': data.purpose.join(', '),
      'Role': data.role || 'N/A',
      'Message': data.message || 'No message provided',
      'reCAPTCHA Score': data.recaptchaScore,
    }
  ];

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const columnWidths = [
    { wch: 20 }, // Submission ID
    { wch: 20 }, // Timestamp
    { wch: 15 }, // Name
    { wch: 25 }, // Email
    { wch: 20 }, // Company
    { wch: 30 }, // Purpose
    { wch: 15 }, // Role
    { wch: 50 }, // Message
    { wch: 15 }, // reCAPTCHA Score
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Submission');

  // Create filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `contact-submission-${data.submissionId}-${timestamp}.xlsx`;

  // Ensure public/data directory exists
  const dataDir = join(process.cwd(), 'public', 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Save file to public/data directory
  const filePath = join(dataDir, filename);
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(filePath, buffer);

  // Return the public URL for the file
  return `/data/${filename}`;
};

export const generateAllSubmissionsExcel = (submissions: ContactFormData[]): string => {
  // Create data for Excel
  const excelData = submissions.map(submission => ({
    'Submission ID': submission.submissionId,
    'Timestamp': submission.timestamp,
    'Name': submission.name,
    'Email': submission.email,
    'Company': submission.company,
    'Purpose': submission.purpose.join(', '),
    'Role': submission.role || 'N/A',
    'Message': submission.message || 'No message provided',
    'reCAPTCHA Score': submission.recaptchaScore,
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const columnWidths = [
    { wch: 20 }, // Submission ID
    { wch: 20 }, // Timestamp
    { wch: 15 }, // Name
    { wch: 25 }, // Email
    { wch: 20 }, // Company
    { wch: 30 }, // Purpose
    { wch: 15 }, // Role
    { wch: 50 }, // Message
    { wch: 15 }, // reCAPTCHA Score
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'All Submissions');

  // Create filename
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `all-contact-submissions-${timestamp}.xlsx`;

  // Ensure public/data directory exists
  const dataDir = join(process.cwd(), 'public', 'data');
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  // Save file to public/data directory
  const filePath = join(dataDir, filename);
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(filePath, buffer);

  // Return the public URL for the file
  return `/data/${filename}`;
}; 