// src/app/auth/AuthForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/contexts/ToastContext';
import {
  Button,
  Input,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui';
import Link from 'next/link';
import {
  Eye,
  EyeOff,
  Chrome,
  ArrowLeft,
  Mail,
  CheckCircle,
  Loader2,
  RefreshCw,
} from 'lucide-react';

type AuthMode = 'login' | 'register' | 'verify-email';

export default function AuthForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { theme } = useTheme();
  const {
    login,
    register,
    loginWithGoogle,
    sendVerificationEmail,
    isLoading,
    isAuthenticated,
  } = useAuth();
  const { success, error: showError } = useToast();

  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [isResendingEmail, setIsResendingEmail] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isDark = theme === 'dark';

  // Set mode from URL params
  useEffect(() => {
    const modeParam = searchParams.get('mode');
    if (
      modeParam === 'register' ||
      modeParam === 'login' ||
      modeParam === 'verify-email'
    ) {
      setMode(modeParam as AuthMode);
    }
  }, [searchParams]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'register') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.acceptTerms) {
        newErrors.acceptTerms = 'You must accept the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (mode === 'login') {
        const result = await login({
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          success('Successfully logged in!');
          router.push('/dashboard');
        } else {
          showError(result.error || 'Login failed');
        }
      } else if (mode === 'register') {
        const result = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (result.success) {
          setRegisteredEmail(formData.email);
          setMode('verify-email');
          success(
            'Account created successfully! Please check your email for verification.'
          );
        } else {
          showError(result.error || 'Registration failed');
        }
      }
    } catch (_error) {
      showError('An unexpected error occurred');
      console.error('Auth error:', _error);
    }
  };

  const handleResendVerification = async () => {
    try {
      setIsResendingEmail(true);
      const result = await sendVerificationEmail();

      if (result.success) {
        success('Verification email sent successfully!');
      } else {
        showError(result.error || 'Failed to send verification email');
      }
    } catch (_error) {
      console.error('Error resending verification email:', _error);
      showError('Failed to resend verification email');
    } finally {
      setIsResendingEmail(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (_error) {
      console.log(_error);
      showError('Google login failed');
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    router.push(`/auth?mode=${newMode}`);
  };

  // Email Verification Section
  const renderVerificationSection = () => (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          <div className="flex flex-col items-center space-y-4">
            <div
              className={`p-4 rounded-full ${
                isDark ? 'bg-indigo-900' : 'bg-indigo-100'
              }`}
            >
              <Mail
                className={`w-8 h-8 ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              />
            </div>
            <div>
              <h3
                className={`text-2xl font-semibold ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                Check Your Email
              </h3>
              <p
                className={`mt-2 text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                We&apos;ve sent a verification link to
              </p>
              <p
                className={`font-medium ${
                  isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}
              >
                {registeredEmail}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div
          className={`p-4 rounded-lg ${
            isDark ? 'bg-slate-800' : 'bg-slate-50'
          }`}
        >
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p
                className={`font-medium ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}
              >
                What&apos;s next?
              </p>
              <ol
                className={`mt-2 space-y-1 list-decimal list-inside ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                <li>Check your email inbox (and spam folder)</li>
                <li>Click the verification link in the email</li>
                <li>Return here to sign in to your account</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleResendVerification}
            disabled={isResendingEmail}
            variant="outline"
            className="w-full"
          >
            {isResendingEmail ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Resend Verification Email
              </>
            )}
          </Button>

          <Button onClick={() => switchMode('login')} className="w-full">
            Continue to Sign In
          </Button>
        </div>

        <div className="text-center">
          <p
            className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            Wrong email address?{' '}
            <button
              type="button"
              onClick={() => switchMode('register')}
              className="text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Try again
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );

  // Main Form Section
  const renderAuthForm = () => (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center">
          <div
            className={`text-3xl font-bold bg-gradient-to-r ${
              isDark
                ? 'from-indigo-300 to-blue-400'
                : 'from-indigo-600 to-blue-600'
            } bg-clip-text text-transparent mb-2`}
          >
            MisterA&apos;s
          </div>
          <div
            className={`text-2xl font-semibold ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </div>
          <p
            className={`mt-2 text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {mode === 'login'
              ? 'Sign in to continue your learning journey'
              : 'Join thousands of learners worldwide'}
          </p>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Google Login */}
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          <Chrome className="w-5 h-5 mr-2" />
          Continue with Google
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div
              className={`w-full border-t ${
                isDark ? 'border-slate-700' : 'border-slate-300'
              }`}
            />
          </div>
          <div className="relative flex justify-center text-sm">
            <span
              className={`px-2 ${
                isDark
                  ? 'bg-slate-800 text-slate-400'
                  : 'bg-white text-slate-500'
              }`}
            >
              Or continue with email
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <Input
              label="Full Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter your full name"
              disabled={isLoading}
            />
          )}

          <Input
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            placeholder="Enter your email"
            disabled={isLoading}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <button
              type="button"
              className={`absolute right-3 top-9 ${
                isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {mode === 'register' && (
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange('confirmPassword', e.target.value)
                }
                error={errors.confirmPassword}
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className={`absolute right-3 top-9 ${
                  isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {mode === 'register' && (
            <div className="flex items-start space-x-2">
              <input
                id="terms"
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  handleInputChange('acceptTerms', e.target.checked)
                }
                className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                disabled={isLoading}
              />
              <label
                htmlFor="terms"
                className={`text-sm ${
                  isDark ? 'text-slate-300' : 'text-slate-700'
                }`}
              >
                I agree to the{' '}
                <Link
                  href="/terms"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>
          )}

          {errors.acceptTerms && (
            <p className="text-sm text-red-600">{errors.acceptTerms}</p>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            loading={isLoading}
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        {/* Switch Mode */}
        <div className="text-center">
          <p
            className={`text-sm ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {mode === 'login'
              ? "Don't have an account? "
              : 'Already have an account? '}
            <button
              type="button"
              onClick={() =>
                switchMode(mode === 'login' ? 'register' : 'login')
              }
              className="text-indigo-600 hover:text-indigo-500 font-medium"
              disabled={isLoading}
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {mode === 'login' && (
          <div className="text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div
      className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-slate-900' : 'bg-slate-50'
      }`}
    >
      <div className="max-w-md w-full space-y-8">
        {/* Back to Home */}
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

        {/* Render appropriate section based on mode */}
        {mode === 'verify-email'
          ? renderVerificationSection()
          : renderAuthForm()}
      </div>
    </div>
  );
}
