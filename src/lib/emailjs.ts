// src/lib/emailjs.ts
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

// Initialize EmailJS (this might be the issue)
export const initializeEmailJS = () => {
  try {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('✅ EmailJS initialized with public key');
      return true;
    } else {
      console.error('❌ No public key for EmailJS initialization');
      return false;
    }
  } catch (error) {
    console.error('❌ Failed to initialize EmailJS:', error);
    return false;
  }
};

export const sendVerificationEmail = async (
  userEmail: string,
  userName: string,
  verificationToken: string
): Promise<{
  success: boolean;
  result?: unknown;
  error?: string;
  details?: Record<string, unknown>;
}> => {
  const debugSteps: string[] = [];

  try {
    // Step 1: Environment validation
    debugSteps.push('🔍 Step 1: Checking environment variables');
    console.log('🔍 Step 1: Environment Variables Check');

    if (!EMAILJS_SERVICE_ID) {
      throw new Error('EMAILJS_SERVICE_ID is missing');
    }
    if (!EMAILJS_TEMPLATE_ID) {
      throw new Error('EMAILJS_TEMPLATE_ID is missing');
    }
    if (!EMAILJS_PUBLIC_KEY) {
      throw new Error('EMAILJS_PUBLIC_KEY is missing');
    }

    console.log('✅ All environment variables present');
    debugSteps.push('✅ Environment variables validated');

    // Step 2: EmailJS availability check
    debugSteps.push('🔍 Step 2: Checking EmailJS availability');
    console.log('🔍 Step 2: EmailJS Library Check');

    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS library is not loaded');
    }

    if (typeof emailjs.send !== 'function') {
      throw new Error('EmailJS.send is not available');
    }

    console.log('✅ EmailJS library is available');
    debugSteps.push('✅ EmailJS library validated');

    // Step 3: Initialize EmailJS
    debugSteps.push('🔍 Step 3: Initializing EmailJS');
    console.log('🔍 Step 3: EmailJS Initialization');

    const initResult = initializeEmailJS();
    if (!initResult) {
      throw new Error('Failed to initialize EmailJS');
    }

    debugSteps.push('✅ EmailJS initialized');

    // Step 4: Parameter validation
    debugSteps.push('🔍 Step 4: Validating parameters');
    console.log('🔍 Step 4: Parameter Validation');

    if (!userEmail || !userEmail.includes('@')) {
      throw new Error('Invalid email address');
    }

    if (!userName || userName.trim().length === 0) {
      throw new Error('Invalid user name');
    }

    if (!verificationToken || verificationToken.trim().length === 0) {
      throw new Error('Invalid verification token');
    }

    console.log('✅ All parameters validated');
    debugSteps.push('✅ Parameters validated');

    // Step 5: Template parameters preparation
    debugSteps.push('🔍 Step 5: Preparing template parameters');
    console.log('🔍 Step 5: Template Parameters');

    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    const templateParams = {
      email: userEmail,
      to_name: userName,
      verification_link: verificationLink,
      from_name: "MisterA's Learning Platform",
    };

    console.log('📧 Template params:', JSON.stringify(templateParams, null, 2));
    debugSteps.push('✅ Template parameters prepared');

    // Step 6: Send email with detailed error catching
    debugSteps.push('🔍 Step 6: Sending email');
    console.log('🔍 Step 6: Sending Email');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);

    // Try the send operation
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
      // Note: Not passing public key here since we initialized it above
    );

    console.log('✅ Email sent successfully:', result);
    debugSteps.push('✅ Email sent successfully');

    return {
      success: true,
      result,
      details: { debugSteps },
    };
  } catch (error) {
    // Enhanced error logging
    console.error('❌ Error in step:', debugSteps[debugSteps.length - 1]);
    console.error('❌ All completed steps:', debugSteps);
    console.error('❌ Raw error:', error);
    console.error('❌ Error string:', String(error));
    console.error(
      '❌ Error JSON:',
      JSON.stringify(error, Object.getOwnPropertyNames(error))
    );

    // Try to get error details in multiple ways
    const errorDetails: Record<string, unknown> = {
      debugSteps,
      errorType: typeof error,
      errorConstructor: error?.constructor?.name,
      errorString: String(error),
    };

    let errorMessage = 'Unknown error in email sending process';

    if (error instanceof Error) {
      errorMessage = error.message;
      errorDetails.name = error.name;
      errorDetails.message = error.message;
      errorDetails.stack = error.stack;
    } else if (error && typeof error === 'object') {
      // Try to extract any available properties
      const errorObj = error as Record<string, unknown>;
      Object.keys(errorObj).forEach((key) => {
        errorDetails[key] = errorObj[key];
      });

      // Common EmailJS error properties
      if ('text' in errorObj) errorMessage = String(errorObj.text);
      if ('message' in errorObj) errorMessage = String(errorObj.message);
      if ('status' in errorObj) errorDetails.status = errorObj.status;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }

    console.error('❌ Processed error message:', errorMessage);
    console.error('❌ Processed error details:', errorDetails);

    return {
      success: false,
      error: errorMessage,
      details: errorDetails,
    };
  }
};

// Alternative sending method using the old way
export const sendVerificationEmailOldWay = async (
  userEmail: string,
  userName: string,
  verificationToken: string
): Promise<{ success: boolean; result?: unknown; error?: string }> => {
  try {
    console.log('🧪 Trying old EmailJS method...');

    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    const templateParams = {
      email: userEmail,
      to_name: userName,
      verification_link: verificationLink,
      from_name: "MisterA's Learning Platform",
    };

    // Use the old method with public key in send call
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID!,
      EMAILJS_TEMPLATE_ID!,
      templateParams,
      EMAILJS_PUBLIC_KEY!
    );

    console.log('✅ Old method successful:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Old method failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};

// Basic connectivity test

// src/lib/emailjs.ts - Add this specific test function
export const debugEmailSending = async (
  userEmail: string,
  userName: string,
  verificationToken: string
): Promise<{
  success: boolean;
  result?: unknown;
  error?: string;
  details?: Record<string, unknown>;
}> => {
  console.log('🎯 FOCUSED EMAIL SENDING DEBUG');

  try {
    // Prepare parameters
    const verificationLink = `${window.location.origin}/verify-email?token=${verificationToken}`;
    const templateParams = {
      email: userEmail,
      to_name: userName,
      verification_link: verificationLink,
      from_name: "MisterA's Learning Platform",
    };

    console.log('🔧 About to send with these exact parameters:');
    console.log('Service ID:', EMAILJS_SERVICE_ID);
    console.log('Template ID:', EMAILJS_TEMPLATE_ID);
    console.log(
      'Public Key (first 10 chars):',
      EMAILJS_PUBLIC_KEY?.substring(0, 10)
    );
    console.log('Template Params:', templateParams);

    // Method 1: Try with public key in the call (most common method)
    console.log('🚀 Method 1: Sending with public key in call...');
    try {
      const result1 = await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        templateParams,
        EMAILJS_PUBLIC_KEY!
      );
      console.log('✅ Method 1 SUCCESS:', result1);
      return {
        success: true,
        result: result1,
        details: { method: 'public_key_in_call' },
      };
    } catch (error1) {
      console.log('❌ Method 1 failed:', error1);
      console.log(
        'Error details:',
        JSON.stringify(error1, Object.getOwnPropertyNames(error1))
      );
    }

    // Method 2: Try with init first, then send without public key
    console.log('🚀 Method 2: Init first, then send...');
    try {
      emailjs.init(EMAILJS_PUBLIC_KEY!);
      const result2 = await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        templateParams
      );
      console.log('✅ Method 2 SUCCESS:', result2);
      return {
        success: true,
        result: result2,
        details: { method: 'init_first' },
      };
    } catch (error2) {
      console.log('❌ Method 2 failed:', error2);
      console.log(
        'Error details:',
        JSON.stringify(error2, Object.getOwnPropertyNames(error2))
      );
    }

    // Method 3: Try with different template params structure
    console.log('🚀 Method 3: Simplified template params...');
    try {
      const simpleParams = {
        email: userEmail,
        message: `Please verify your email: ${verificationLink}`,
        from_name: 'Test Platform',
      };

      const result3 = await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        simpleParams,
        EMAILJS_PUBLIC_KEY!
      );
      console.log('✅ Method 3 SUCCESS:', result3);
      return {
        success: true,
        result: result3,
        details: { method: 'simplified_params' },
      };
    } catch (error3) {
      console.log('❌ Method 3 failed:', error3);
      console.log(
        'Error details:',
        JSON.stringify(error3, Object.getOwnPropertyNames(error3))
      );
    }

    // Method 4: Try with minimal params (just to see if EmailJS works at all)
    console.log('🚀 Method 4: Minimal test...');
    try {
      const minimalParams = {
        email: userEmail,
        test_message: 'This is a test',
      };

      const result4 = await emailjs.send(
        EMAILJS_SERVICE_ID!,
        EMAILJS_TEMPLATE_ID!,
        minimalParams,
        EMAILJS_PUBLIC_KEY!
      );
      console.log('✅ Method 4 SUCCESS:', result4);
      return {
        success: true,
        result: result4,
        details: { method: 'minimal_test' },
      };
    } catch (error4) {
      console.log('❌ Method 4 failed:', error4);
      console.log(
        'Error details:',
        JSON.stringify(error4, Object.getOwnPropertyNames(error4))
      );
    }

    return {
      success: false,
      error: 'All email sending methods failed',
      details: { allMethodsFailed: true },
    };
  } catch (outerError) {
    console.error('❌ Outer catch error:', outerError);
    return {
      success: false,
      error: 'Debug function failed',
      details: { outerError: String(outerError) },
    };
  }
};

// Test with hardcoded values to eliminate variable issues
export const testWithHardcodedValues = async (): Promise<{
  success: boolean;
  result?: unknown;
  error?: string;
}> => {
  try {
    console.log('🧪 Testing with hardcoded values...');

    // Replace these with your ACTUAL values from EmailJS dashboard
    const HARDCODED_SERVICE_ID = 'service_cb10eh9'; // Replace with your service ID
    const HARDCODED_TEMPLATE_ID = 'template_7udgkta'; // Replace with your template ID
    const HARDCODED_PUBLIC_KEY = 'NVov8d_wFbCugMzyx'; // Replace with your public key

    const result = await emailjs.send(
      HARDCODED_SERVICE_ID,
      HARDCODED_TEMPLATE_ID,
      {
        email: 'fuchuobedbol@gmail.com', // Replace with your email
        to_name: 'Test User',
        verification_link: 'https://example.com/test',
        from_name: 'Test App',
      },
      HARDCODED_PUBLIC_KEY
    );

    console.log('✅ Hardcoded test SUCCESS:', result);
    return { success: true, result };
  } catch (error) {
    console.error('❌ Hardcoded test failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
};
// src/lib/emailjs.ts - Add the missing testEmailJSConnectivity function
export const testEmailJSConnectivity = async (): Promise<{
  success: boolean;
  error?: string;
  details?: Record<string, unknown>;
}> => {
  try {
    console.log('🧪 Testing EmailJS connectivity...');

    // Test 1: Check if EmailJS is loaded
    if (typeof emailjs === 'undefined') {
      throw new Error('EmailJS is not loaded');
    }

    // Test 2: Check environment variables
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('Missing environment variables');
    }

    // Test 3: Check if we're in browser environment
    if (typeof window === 'undefined') {
      throw new Error('Not in browser environment');
    }

    console.log('✅ Basic connectivity checks passed');
    return {
      success: true,
      details: {
        emailjsLoaded: true,
        envVarsSet: true,
        browserEnvironment: true,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
      details: {
        emailjsLoaded: typeof emailjs !== 'undefined',
        envVarsSet: {
          serviceId: !!EMAILJS_SERVICE_ID,
          templateId: !!EMAILJS_TEMPLATE_ID,
          publicKey: !!EMAILJS_PUBLIC_KEY,
        },
        browserEnvironment: typeof window !== 'undefined',
      },
    };
  }
};
