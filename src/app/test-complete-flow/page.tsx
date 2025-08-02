'use client';

import { useState } from 'react';

export default function TestCompleteFlowPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [downloadResult, setDownloadResult] = useState<any>(null);

  const testCompleteFlow = async () => {
    setIsLoading(true);
    setResult(null);
    setDownloadResult(null);
    
    try {
      // Step 1: Submit contact form
      const formData = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'Test Company Ltd',
        purpose: ['General Inquiry', 'Partnership Opportunity'],
        role: 'Senior Manager',
        message: 'This is a test message to verify the complete flow. I would like to discuss potential collaboration opportunities.',
        recaptchaToken: 'test-token',
        honeypot: ''
      };

      console.log('Step 1: Submitting contact form...');
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResult(data);
      
      if (data.success) {
        console.log('✅ Contact form submitted successfully');
        
        // Step 2: Wait a moment for file generation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Step 3: Test download functionality
        console.log('Step 2: Testing download functionality...');
        await testDownload('master-contact-submissions.xlsx');
      } else {
        console.error('❌ Contact form submission failed:', data);
      }
    } catch (error) {
      console.error('❌ Test failed:', error);
      setResult({ error: 'Failed to test complete flow' });
    } finally {
      setIsLoading(false);
    }
  };

  const testDownload = async (filename: string) => {
    try {
      const response = await fetch(`/api/download-excel/${filename}`);
      
      if (response.ok) {
        // Create a blob and download it
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        setDownloadResult({ 
          success: true, 
          message: `Downloaded ${filename} successfully!`,
          fileSize: blob.size,
          fileType: blob.type
        });
        console.log('✅ File downloaded successfully');
      } else {
        const errorData = await response.json();
        setDownloadResult({ success: false, error: errorData.error || 'Download failed' });
        console.error('❌ Download failed:', errorData);
      }
    } catch (error) {
      setDownloadResult({ success: false, error: 'Failed to download file' });
      console.error('❌ Download error:', error);
    }
  };

  const checkFiles = async () => {
    try {
      const response = await fetch('/api/download-submissions');
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to check files' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Complete Flow Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                Complete Email & Excel Flow Test:
              </h2>
              <ol className="text-blue-800 space-y-1 list-decimal list-inside">
                <li>Submit contact form with user data</li>
                <li>Generate Excel file with user information</li>
                <li>Send email with download link</li>
                <li>Test download functionality</li>
                <li>Verify Excel file contains correct data</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={testCompleteFlow}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Complete Flow'}
              </button>

              <button
                onClick={checkFiles}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Check Available Files
              </button>

              <button
                onClick={() => testDownload('master-contact-submissions.xlsx')}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Download Master File
              </button>
            </div>

            {result && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Form Submission Result:
                </h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {downloadResult && (
              <div className={`p-4 rounded-lg ${downloadResult.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${downloadResult.success ? 'text-green-900' : 'text-red-900'}`}>
                  Download Result:
                </h3>
                <pre className={`text-sm whitespace-pre-wrap ${downloadResult.success ? 'text-green-800' : 'text-red-800'}`}>
                  {JSON.stringify(downloadResult, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                What to Check:
              </h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>✅ Console logs show Excel generation process</li>
                <li>✅ Email is sent with download links</li>
                <li>✅ Download links work and trigger file download</li>
                <li>✅ Excel file contains user information</li>
                <li>✅ File opens correctly in Excel/Google Sheets</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Expected Excel Content:
              </h3>
              <div className="text-green-800 text-sm">
                <p><strong>Columns:</strong> Submission ID, Timestamp, Name, Email, Company, Purpose, Role, Message, reCAPTCHA Score</p>
                <p><strong>Sample Data:</strong></p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Name: John Doe</li>
                  <li>Email: john.doe@example.com</li>
                  <li>Company: Test Company Ltd</li>
                  <li>Purpose: General Inquiry, Partnership Opportunity</li>
                  <li>Role: Senior Manager</li>
                  <li>Message: [User&apos;s message content]</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Email Flow:
              </h3>
              <ol className="text-blue-800 space-y-1 text-sm list-decimal list-inside">
                <li>User submits contact form</li>
                <li>System generates Excel file with user data</li>
                <li>Admin email sent with download links</li>
                <li>User email sent with their data download link</li>
                <li>Clicking links downloads Excel files</li>
                <li>Excel files contain complete user information</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 