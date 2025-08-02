import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import clientConfig from "@/sanity/config/client-config";
import { generateAllSubmissionsExcel, ContactFormData } from "@/utils/excel";

const client = createClient(clientConfig);

export async function GET() {
  try {
    // Fetch all contact submissions from Sanity
    const submissions = await client.fetch(`
      *[_type == "contactSubmission"] | order(timestamp desc) {
        _id,
        timestamp,
        name,
        email,
        company,
        purpose,
        role,
        message,
        recaptcha_score
      }
    `);

    if (!submissions || submissions.length === 0) {
      return NextResponse.json({ 
        success: false, 
        error: "No submissions found" 
      }, { status: 404 });
    }

    // Transform data for Excel generation
    const contactData: ContactFormData[] = submissions.map((submission: any) => ({
      name: submission.name,
      email: submission.email,
      company: submission.company,
      purpose: submission.purpose || [],
      role: submission.role,
      message: submission.message,
      timestamp: submission.timestamp,
      submissionId: submission._id,
      recaptchaScore: submission.recaptcha_score || 0,
    }));

    // Generate Excel file
    const excelFileUrl = generateAllSubmissionsExcel(contactData);
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://zerobuild.vercel.app' 
      : 'http://localhost:3000';
    const fullExcelUrl = `${baseUrl}/api/download-excel/${excelFileUrl.split('/').pop()}`;

    return NextResponse.json({
      success: true,
      message: `Successfully generated Excel file with ${submissions.length} submissions`,
      downloadUrl: fullExcelUrl,
      submissionCount: submissions.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating submissions Excel:", error);
    
    return NextResponse.json({ 
      success: false, 
      error: "Failed to generate Excel file",
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 