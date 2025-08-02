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

// Helper function to safely create directory
const ensureDirectoryExists = (dirPath: string): boolean => {
  try {
    if (!existsSync(dirPath)) {
      console.log('Creating directory:', dirPath);
      mkdirSync(dirPath, { recursive: true });
      console.log('✅ Directory created successfully');
    }
    return true;
  } catch (error) {
    console.error('❌ Failed to create directory:', dirPath, error);
    return false;
  }
};

// Helper function to get safe data directory path
const getDataDirectory = (): string => {
  try {
    // Try to use the current working directory
    const cwd = process.cwd();
    console.log('Current working directory:', cwd);
    
    // Check if we're in a serverless environment
    if (cwd.includes('/var/task') || cwd.includes('/tmp')) {
      console.log('Detected serverless environment, using /tmp');
      return '/tmp/data';
    }
    
    // Use the standard public/data directory
    const dataDir = join(cwd, 'public', 'data');
    console.log('Using standard data directory:', dataDir);
    return dataDir;
  } catch (error) {
    console.error('Error determining data directory:', error);
    // Fallback to /tmp
    return '/tmp/data';
  }
};

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

  console.log('Excel data structure:', JSON.stringify(excelData, null, 2));

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

  // Get data directory and ensure it exists
  const dataDir = getDataDirectory();
  if (!ensureDirectoryExists(dataDir)) {
    console.error('❌ Failed to create data directory, cannot save Excel file');
    throw new Error('Failed to create data directory');
  }

  // Save file to data directory
  const filePath = join(dataDir, filename);
  try {
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    writeFileSync(filePath, buffer);

    console.log('✅ Excel file created successfully!');
    console.log('File path:', filePath);
    console.log('File size:', buffer.length, 'bytes');
    console.log('Public URL:', `/data/${filename}`);
    console.log('Download URL:', `/api/download-excel/${filename}`);
    console.log('=== EXCEL GENERATION END ===');

    // Return the public URL for the file
    return `/data/${filename}`;
  } catch (error) {
    console.error('❌ Failed to write Excel file:', error);
    throw new Error(`Failed to write Excel file: ${error}`);
  }
};

// Function to append data to master Excel file
export const appendToMasterExcel = (data: ContactFormData): string => {
  console.log('=== APPENDING TO MASTER EXCEL ===');
  
  const masterFilename = 'master-contact-submissions.xlsx';
  const dataDir = getDataDirectory();
  const masterFilePath = join(dataDir, masterFilename);
  
  // Ensure data directory exists
  if (!ensureDirectoryExists(dataDir)) {
    console.error('❌ Failed to create data directory for master file');
    throw new Error('Failed to create data directory');
  }

  let workbook: XLSX.WorkBook;
  let existingData: any[] = [];

  // Check if master file exists
  if (existsSync(masterFilePath)) {
    try {
      console.log('Master file exists, reading existing data...');
      const fileBuffer = readFileSync(masterFilePath);
      workbook = XLSX.read(fileBuffer, { type: 'buffer' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      existingData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Existing records:', existingData.length);
    } catch (error) {
      console.error('❌ Failed to read existing master file:', error);
      workbook = XLSX.utils.book_new();
      existingData = [];
    }
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
  try {
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    writeFileSync(masterFilePath, buffer);

    console.log('✅ Data appended to master Excel file!');
    console.log('Total records in master file:', existingData.length);
    console.log('Master file path:', masterFilePath);
    console.log('=== MASTER EXCEL UPDATE END ===');

    return `/data/${masterFilename}`;
  } catch (error) {
    console.error('❌ Failed to write master Excel file:', error);
    throw new Error(`Failed to write master Excel file: ${error}`);
  }
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

  // Get data directory and ensure it exists
  const dataDir = getDataDirectory();
  if (!ensureDirectoryExists(dataDir)) {
    console.error('❌ Failed to create data directory for all submissions file');
    throw new Error('Failed to create data directory');
  }

  // Save file to data directory
  const filePath = join(dataDir, filename);
  try {
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
    writeFileSync(filePath, buffer);

    console.log('✅ All submissions Excel file created!');
    console.log('File path:', filePath);
    console.log('File size:', buffer.length, 'bytes');
    console.log('=== ALL SUBMISSIONS EXCEL END ===');

    // Return the public URL for the file
    return `/data/${filename}`;
  } catch (error) {
    console.error('❌ Failed to write all submissions Excel file:', error);
    throw new Error(`Failed to write all submissions Excel file: ${error}`);
  }
}; 