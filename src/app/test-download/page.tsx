'use client';

import { useState } from 'react';

export default function TestDownloadPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const testDownload = async (filename: string) => {
    setIsLoading(true);
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
        
        setResult({ success: true, message: `Downloaded ${filename} successfully!` });
      } else {
        const errorData = await response.json();
        setResult({ success: false, error: errorData.error || 'Download failed' });
      }
    } catch (error) {
      setResult({ success: false, error: 'Failed to download file' });
    } finally {
      setIsLoading(false);
    }
  };

  const testContactForm = async () => {
    setIsLoading(true);
    try {
      const formData = {
        name: 'Download Test User',
        email: 'download-test@example.com',
        company: 'Download Test Company',
        purpose: ['Testing Downloads'],
        role: 'Tester',
        message: 'This is a test to verify Excel download functionality.',
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
            Excel Download Test
          </h1>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-900 mb-2">
                What this page tests:
              </h2>
              <ul className="text-blue-800 space-y-1">
                <li>• Excel file download functionality</li>
                <li>• Proper file serving with correct headers</li>
                <li>• Browser download behavior</li>
                <li>• File access and security</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => testContactForm()}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Testing...' : 'Test Contact Form & Generate Excel'}
              </button>

              <button
                onClick={() => testDownload('master-contact-submissions.xlsx')}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                {isLoading ? 'Downloading...' : 'Test Download Master File'}
              </button>
            </div>

            {result && (
              <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50' : 'bg-red-50'}`}>
                <h3 className={`text-lg font-semibold mb-2 ${result.success ? 'text-green-900' : 'text-red-900'}`}>
                  Test Result:
                </h3>
                <pre className={`text-sm whitespace-pre-wrap ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                How Downloads Work:
              </h3>
              <ul className="text-yellow-800 space-y-1 text-sm">
                <li>• Files are served via <code>/api/download-excel/[filename]</code></li>
                <li>• Proper headers force browser download</li>
                <li>• Security checks prevent unauthorized access</li>
                <li>• Files are read from the correct data directory</li>
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Expected Behavior:
              </h3>
              <ul className="text-green-800 space-y-1 text-sm">
                <li>• Clicking download links should trigger file download</li>
                <li>• Files should have proper Excel extensions (.xlsx)</li>
                <li>• Downloads should work in all modern browsers</li>
                <li>• File content should be valid Excel data</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 