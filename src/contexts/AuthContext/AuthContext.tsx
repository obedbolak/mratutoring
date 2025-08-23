// src/contexts/AuthContext/AuthContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import {
  AuthUser,
  LoginCredentials,
  RegisterData,
  AuthResponse,
} from '../../types/user';
import { AuthContextType, AuthProviderProps } from './types';
import { sendVerificationEmail } from '@/lib/emailjs';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('=== AUTH CONTEXT DEBUG ===');
    console.log('Session status:', status);
    console.log('Session data:', session);
    console.log('========================');

    if (status === 'loading') {
      setIsLoading(true);
    } else {
      setIsLoading(false);

      if (session?.user && session.user.email) {
        console.log('✅ Setting user from session');
        setUser({
          id: session.user.id || '',
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image,
          role: session.user.role || 'student',
          verified: session.user.verified || false,
        });
      } else {
        console.log('❌ No valid session, clearing user');
        setUser(null);
      }
    }
  }, [session, status]);

  const login = async ({
    email,
    password,
  }: LoginCredentials): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      console.log('🔐 Attempting login for:', email);

      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      console.log('Login result:', result);

      if (result?.error) {
        console.log('❌ Login failed:', result.error);
        return { success: false, error: result.error };
      }

      if (result?.ok) {
        console.log('✅ Login successful');
        // Wait a bit for session to update
        setTimeout(async () => {
          await refreshUser();
        }, 1000);
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      console.log('📝 Attempting registration for:', userData.email);

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log('Register response:', response.status, data);

      if (!response.ok) {
        return { success: false, error: data.error || 'Registration failed' };
      }

      // Send verification email using EmailJS if token is provided
      if (data.verificationToken) {
        console.log('📧 Sending verification email...');
        const emailResult = await sendVerificationEmail(
          userData.email,
          userData.name,
          data.verificationToken
        );

        if (!emailResult.success) {
          console.error(
            'Failed to send verification email:',
            emailResult.error
          );
          // Continue with registration even if email fails
        } else {
          console.log('✅ Verification email sent successfully');
        }
      }

      return {
        success: true,
        message:
          'Registration successful! Please check your email to verify your account before logging in.',
      };
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const sendVerificationEmailAgain = async (): Promise<AuthResponse> => {
    if (!user?.email) {
      return { success: false, error: 'No user email found' };
    }

    try {
      setIsLoading(true);
      console.log('📧 Resending verification email...');

      // Get new verification token from server
      const response = await fetch('/api/auth/send-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Failed to send verification email',
        };
      }

      // Send email using EmailJS
      const emailResult = await sendVerificationEmail(
        user.email,
        user.name,
        data.verificationToken
      );

      if (emailResult.success) {
        return {
          success: true,
          message: 'Verification email sent successfully!',
        };
      } else {
        return { success: false, error: 'Failed to send verification email' };
      }
    } catch (err) {
      console.error('Send verification email error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      console.log('✅ Verifying email with token...');

      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || 'Email verification failed',
        };
      }

      // Refresh user session after verification
      await refreshUser();

      return { success: true, message: 'Email verified successfully!' };
    } catch (err) {
      console.error('Email verification error:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('🔍 Attempting Google login');
      await signIn('google', { callbackUrl: '/' });
    } catch (err) {
      console.error('Google login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      console.log('👋 Logging out');
      await signOut({ callbackUrl: '/' });
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const session = await getSession();
      console.log('🔄 Refreshed session:', session);

      if (session?.user && session.user.email) {
        setUser({
          id: session.user.id || '',
          name: session.user.name || '',
          email: session.user.email || '',
          image: session.user.image,
          role: session.user.role || 'student',
          verified: session.user.verified || false,
        });
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error('Error refreshing user:', err);
    }
  };

  // More specific authentication check
  const isAuthenticated = !!(
    user &&
    session &&
    session.user &&
    session.user.email
  );

  console.log(
    '🔍 isAuthenticated:',
    isAuthenticated,
    'user exists:',
    !!user,
    'session exists:',
    !!session
  );

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    loginWithGoogle,
    logout,
    refreshUser,
    sendVerificationEmail: sendVerificationEmailAgain,
    verifyEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
