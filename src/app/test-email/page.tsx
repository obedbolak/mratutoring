// src/app/test-email/page.tsx
'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState('');

  const testDirectEmailJS = async () => {
    setResult('Testing...');

    try {
      // Import EmailJS
      const emailjs = await import('@emailjs/browser');
      setResult((prev) => prev + '\n✅ EmailJS imported successfully');

      // Test with your actual values - REPLACE THESE WITH YOUR REAL VALUES
      const SERVICE_ID = 'service_cb10eh9'; // Replace with your service ID
      const TEMPLATE_ID = 'template_7udgkta'; // Replace with your template ID
      const PUBLIC_KEY = 'NVov8d_wFbCugMzyx'; // Replace with your public key

      const templateParams = {
        email: email,
        to_name: 'Test User',
        verification_link: 'https://example.com/test',
        from_name: 'Test Platform',
      };

      setResult((prev) => prev + '\n🚀 Sending email...');

      const response = await emailjs.default.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setResult(
        (prev) => prev + '\n✅ SUCCESS: ' + JSON.stringify(response, null, 2)
      );
    } catch (error) {
      setResult(
        (prev) =>
          prev +
          '\n❌ ERROR: ' +
          JSON.stringify(error, Object.getOwnPropertyNames(error), 2)
      );
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Direct EmailJS Test</h1>

      <div className="space-y-4">
        <Input
          type="email"
          placeholder="Enter test email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button onClick={testDirectEmailJS} disabled={!email}>
          Test Direct EmailJS
        </Button>

        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-bold mb-2">Results:</h3>
          <pre className="text-sm whitespace-pre-wrap">
            {result || 'No test run yet...'}
          </pre>
        </div>
      </div>

      <div className="mt-4 p-4 bg-red-50 rounded-lg">
        <h4 className="font-bold text-red-800 mb-2">⚠️ Before Testing:</h4>
        <p className="text-sm text-red-700">
          Update the SERVICE_ID, TEMPLATE_ID, and PUBLIC_KEY variables in the
          code above with your actual EmailJS credentials.
        </p>
      </div>
    </div>
  );
}
