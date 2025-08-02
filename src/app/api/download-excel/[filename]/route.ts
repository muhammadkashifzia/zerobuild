import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Helper function to get data directory path
const getDataDirectory = (): string => {
  try {
    const cwd = process.cwd();
    
    // Check if we're in a serverless environment
    if (cwd.includes('/var/task') || cwd.includes('/tmp')) {
      return '/tmp/data';
    }
    
    // Use the standard public/data directory
    return join(cwd, 'public', 'data');
  } catch (error) {
    return '/tmp/data';
  }
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await params;
    
    // Security check - only allow .xlsx files
    if (!filename.endsWith('.xlsx')) {
      return NextResponse.json({ 
        error: 'Invalid file type' 
      }, { status: 400 });
    }

    // Get the data directory
    const dataDir = getDataDirectory();
    const filePath = join(dataDir, filename);

    console.log('Download request for file:', filename);
    console.log('File path:', filePath);

    // Check if file exists
    if (!existsSync(filePath)) {
      console.error('File not found:', filePath);
      return NextResponse.json({ 
        error: 'File not found' 
      }, { status: 404 });
    }

    // Read the file
    const fileBuffer = readFileSync(filePath);
    
    console.log('File found, size:', fileBuffer.length, 'bytes');

    // Create response with proper headers for Excel download
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'no-cache',
      },
    });

    return response;

  } catch (error) {
    console.error('Error serving Excel file:', error);
    return NextResponse.json({ 
      error: 'Failed to serve file',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 