import * as XLSX from 'xlsx';
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'fs';
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
  console.log('=== EXCEL GENERATION START ===');
  console.log('Generating Excel file for submission:', data.submissionId);
  console.log('Data to be included:', {
    name: data.name,
    email: data.email,
    company: data.company,
    purpose: data.purpose,
    role: data.role,
    messageLength: data.message?.length || 0
  });

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
    console.log('Creating data directory:', dataDir);
    mkdirSync(dataDir, { recursive: true });
  }

  // Save file to public/data directory
  const filePath = join(dataDir, filename);
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(filePath, buffer);

  console.log('✅ Excel file created successfully!');
  console.log('File path:', filePath);
  console.log('File size:', buffer.length, 'bytes');
  console.log('Public URL:', `/data/${filename}`);
  console.log('=== EXCEL GENERATION END ===');

  // Return the public URL for the file
  return `/data/${filename}`;
};

// Function to append data to master Excel file
export const appendToMasterExcel = (data: ContactFormData): string => {
  console.log('=== APPENDING TO MASTER EXCEL ===');
  
  const masterFilename = 'master-contact-submissions.xlsx';
  const dataDir = join(process.cwd(), 'public', 'data');
  const masterFilePath = join(dataDir, masterFilename);
  
  // Ensure data directory exists
  if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
  }

  let workbook: XLSX.WorkBook;
  let existingData: any[] = [];

  // Check if master file exists
  if (existsSync(masterFilePath)) {
    console.log('Master file exists, reading existing data...');
    const fileBuffer = readFileSync(masterFilePath);
    workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    existingData = XLSX.utils.sheet_to_json(worksheet);
    console.log('Existing records:', existingData.length);
  } else {
    console.log('Creating new master file...');
    workbook = XLSX.utils.book_new();
  }

  // Add new data
  const newRow = {
    'Submission ID': data.submissionId,
    'Timestamp': data.timestamp,
    'Name': data.name,
    'Email': data.email,
    'Company': data.company,
    'Purpose': data.purpose.join(', '),
    'Role': data.role || 'N/A',
    'Message': data.message || 'No message provided',
    'reCAPTCHA Score': data.recaptchaScore,
  };

  existingData.push(newRow);

  // Create new worksheet with all data
  const worksheet = XLSX.utils.json_to_sheet(existingData);

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

  // Replace or add worksheet
  if (workbook.SheetNames.includes('All Submissions')) {
    workbook.Sheets['All Submissions'] = worksheet;
  } else {
    XLSX.utils.book_append_sheet(workbook, worksheet, 'All Submissions');
  }

  // Save updated file
  const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
  writeFileSync(masterFilePath, buffer);

  console.log('✅ Data appended to master Excel file!');
  console.log('Total records in master file:', existingData.length);
  console.log('Master file path:', masterFilePath);
  console.log('=== MASTER EXCEL UPDATE END ===');

  return `/data/${masterFilename}`;
};

export const generateAllSubmissionsExcel = (submissions: ContactFormData[]): string => {
  console.log('=== GENERATING ALL SUBMISSIONS EXCEL ===');
  console.log('Total submissions to process:', submissions.length);

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

  console.log('✅ All submissions Excel file created!');
  console.log('File path:', filePath);
  console.log('File size:', buffer.length, 'bytes');
  console.log('=== ALL SUBMISSIONS EXCEL END ===');

  // Return the public URL for the file
  return `/data/${filename}`;
}; 