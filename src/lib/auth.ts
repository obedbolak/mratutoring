// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { findUserByEmail, createUser, verifyPassword } from './auth-utils';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          const user = await findUserByEmail(credentials.email);

          if (!user) {
            throw new Error('No user found with this email');
          }

          if (user.provider !== 'credentials') {
            throw new Error('Please sign in with Google');
          }

          if (!user.password) {
            throw new Error('Invalid credentials');
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error('Invalid credentials');
          }

          return {
            id: user._id!.toString(),
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role,
            verified: user.verified,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'google') {
          const existingUser = await findUserByEmail(user.email!);

          if (existingUser) {
            if (existingUser.provider === 'credentials') {
              return false; // Don't allow Google sign-in if email exists with credentials
            }
            return true;
          } else {
            // Create new user
            await createUser({
              name: user.name!,
              email: user.email!,
              image: user.image,
              provider: 'google',
              providerId: user.id,
              verified: true,
              role: 'student',
            });
            return true;
          }
        }
        return true;
      } catch (error) {
        console.error('Sign in error:', error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        try {
          const dbUser = await findUserByEmail(user.email!);
          if (dbUser) {
            token.role = dbUser.role;
            token.verified = dbUser.verified;
            token.id = dbUser._id!.toString();
          }
        } catch (error) {
          console.error('JWT callback error:', error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.verified = token.verified as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
    error: '/auth',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};
