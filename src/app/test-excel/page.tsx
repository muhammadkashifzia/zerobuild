'use client';

import { useState } from 'react';

export default function TestExcelPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testExcelGeneration = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to test Excel generation' });
    } finally {
      setIsLoading(false);
    }
  };

  const testContactForm = async () => {
    setIsLoading(true);
    try {
      const formData = {
        name: 'Test User',
        email: 'test@example.com',
        company: 'Test Company',
        purpose: ['General Inquiry', 'Partnership'],
        role: 'Manager',
        message: 'This is a test message to verify Excel generation.',
        recaptchaToken: 'test-token',
        honeypot: ''
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: 'Failed to test contact form' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Excel Generation Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                What this page tests:
              </h2>
              <ul className="text-blue-800 space-y-1">
                <li>• Excel file generation when form is submitted</li>
                <li>• Individual Excel file creation</li>
                <li>• Master Excel file updates</li>
                <li>• Email with download links</li>
                <li>• File storage in public/data directory</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={testExcelGeneration}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Email/Excel Generation'}
              </button>

              <button
                onClick={testContactForm}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Contact Form'}
              </button>
            </div>

            {result && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Test Result:
                </h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Check Console:
              </h3>
              <p className="text-yellow-800">
                Open your browser&apos;s developer console to see detailed Excel generation logs.
                You should see messages like:
              </p>
              <ul className="text-yellow-800 mt-2 space-y-1 text-sm">
                <li>• &quot;=== EXCEL GENERATION START ===&quot;</li>
                <li>• &quot;✅ Excel file created successfully!&quot;</li>
                <li>• &quot;=== APPENDING TO MASTER EXCEL ===&quot;</li>
                <li>• &quot;✅ Data appended to master Excel file!&quot;</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Check Files:
              </h3>
              <p className="text-green-800">
                After testing, check the <code className="bg-green-100 px-1 rounded">public/data/</code> directory for generated Excel files:
              </p>
              <ul className="text-green-800 mt-2 space-y-1 text-sm">
                <li>Individual files: <code>contact-submission-[ID]-[timestamp].xlsx</code></li>
                <li>Master file: <code>master-contact-submissions.xlsx</code></li>
                <li>All submissions: <code>all-contact-submissions-[date].xlsx</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 