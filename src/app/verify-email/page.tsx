// src/app/verify-email/page.tsx
'use client';

import { Suspense } from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import { Card, CardContent, Button } from '@/components/ui';
import { CheckCircle, XCircle, Loader2, Mail, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Separate component for the verification logic
function VerifyEmailContent() {
  const { verifyEmail, sendVerificationEmail, isAuthenticated, user } =
    useAuth();
  const { theme } = useTheme();
  const { success, error: showError } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const isDark = theme === 'dark';

  const [status, setStatus] = useState<
    'loading' | 'success' | 'error' | 'no-token'
  >('loading');
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [hasVerified, setHasVerified] = useState(false);

  const handleVerification = useCallback(
    async (token: string) => {
      if (hasVerified) {
        console.log('Already verified, skipping...');
        return;
      }

      try {
        console.log('🔍 Verifying token:', token);
        setHasVerified(true);

        const result = await verifyEmail(token);

        if (result.success) {
          setStatus('success');
          setMessage(result.message || 'Email verified successfully!');
          success('Email verified successfully!');

          setTimeout(() => {
            if (isAuthenticated && user?.verified) {
              console.log(
                'User is authenticated and verified, redirecting to dashboard'
              );
              router.push('/dashboard');
            } else {
              console.log('User not authenticated, redirecting to login');
              router.push('/auth?mode=login');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(result.error || 'Email verification failed');
          showError(result.error || 'Email verification failed');
          setHasVerified(false);
        }
      } catch (error) {
        console.error('Verification error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred during verification');
        showError('An unexpected error occurred');
        setHasVerified(false);
      }
    },
    [
      verifyEmail,
      hasVerified,
      success,
      showError,
      isAuthenticated,
      user,
      router,
    ]
  );

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('no-token');
      setMessage('No verification token provided');
      return;
    }

    if (!hasVerified) {
      handleVerification(token);
    }
  }, [searchParams, handleVerification, hasVerified]);

  useEffect(() => {
    if (isAuthenticated && user?.verified && status === 'success') {
      console.log(
        'User is verified and authenticated, redirecting to dashboard'
      );
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, status, router]);

  const handleResendEmail = async () => {
    setIsResending(true);
    try {
      const result = await sendVerificationEmail();
      if (result.success) {
        success('Verification email sent successfully!');
        setMessage(
          'A new verification email has been sent. Please check your inbox.'
        );
      } else {
        showError(result.error || 'Failed to send verification email');
      }
    } catch (error) {
      console.error('Error resending verification email:', error);
      showError('Failed to send verification email');
    } finally {
      setIsResending(false);
    }
  };

  const handleContinue = () => {
    if (isAuthenticated && user?.verified) {
      router.push('/dashboard');
    } else {
      router.push('/auth?mode=login');
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-indigo-600" />
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Verifying Your Email
            </h2>
            <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>
              Please wait while we verify your email address...
            </p>
          </>
        );

      case 'success':
        return (
          <>
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Email Verified Successfully!
            </h2>
            <p
              className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              {message}
            </p>
            <p
              className={`text-sm ${
                isDark ? 'text-slate-500' : 'text-slate-500'
              } mb-4`}
            >
              {isAuthenticated && user?.verified
                ? 'Redirecting to your dashboard...'
                : 'You can now sign in to your account.'}
            </p>
            <Button onClick={handleContinue} className="w-full">
              {isAuthenticated && user?.verified
                ? 'Go to Dashboard'
                : 'Continue to Login'}
            </Button>
          </>
        );

      case 'error':
        return (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Verification Failed
            </h2>
            <p
              className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              {message}
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Resend Verification Email
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/auth?mode=login')}
                className="w-full"
              >
                Back to Login
              </Button>
            </div>
          </>
        );

      case 'no-token':
        return (
          <>
            <XCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
            <h2
              className={`text-2xl font-bold mb-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Invalid Verification Link
            </h2>
            <p
              className={`mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}
            >
              This verification link is invalid or incomplete. Please check your
              email and click the correct link.
            </p>
            <div className="space-y-3">
              <Button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full"
              >
                {isResending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 mr-2" />
                    Send New Verification Email
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/auth?mode=register')}
                className="w-full"
              >
                Back to Registration
              </Button>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link
            href="/"
            className={`inline-flex items-center text-sm ${
              isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            } transition-colors duration-200`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-2xl">
          <CardContent className="p-8 text-center">
            {renderContent()}
          </CardContent>
        </Card>

        {(status === 'error' || status === 'no-token') && (
          <Card className={`${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}>
            <CardContent className="p-4">
              <h4
                className={`font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Need Help?
              </h4>
              <ul
                className={`text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                } space-y-1`}
              >
                <li>• Check your email spam/junk folder</li>
                <li>
                  • Make sure you clicked the complete link from the email
                </li>
                <li>• Verification links expire after 24 hours</li>
                <li>• You can request a new verification email above</li>
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function VerifyEmailFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-md w-full space-y-8">
        <Card className="shadow-2xl">
          <CardContent className="p-8 text-center">
            <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-indigo-600" />
            <h2 className="text-2xl font-bold mb-2 text-slate-900">
              Loading...
            </h2>
            <p className="text-slate-600">
              Please wait while we load the verification page...
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<VerifyEmailFallback />}>
      <VerifyEmailContent />
    </Suspense>
  );
}
