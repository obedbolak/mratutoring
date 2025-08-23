// src/types/user.ts
import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string; // Optional for OAuth users
  image?: string;
  provider: 'credentials' | 'google';
  providerId?: string;
  verified: boolean;

  role: 'student' | 'teacher' | 'admin';
  profile?: {
    bio?: string;
    phone?: string;
    dateOfBirth?: Date;
    subjects?: string[];
    level?: 'O-Level' | 'A-Level' | 'Both';
    location?: string;
    institution?: string;
  };
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  verified: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: 'student' | 'teacher';
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: AuthUser;
}

// Additional types for user operations
export interface UserUpdateData {
  name?: string;
  email?: string;
  image?: string;
  verified?: boolean;
  role?: 'student' | 'teacher' | 'admin';
  profile?: User['profile'];
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProfileUpdateData {
  bio?: string;
  phone?: string;
  dateOfBirth?: Date;
  subjects?: string[];
  level?: 'O-Level' | 'A-Level' | 'Both';
  location?: string;
  institution?: string;
}

// Database query types
export interface UserQuery {
  _id?: ObjectId;
  email?: string;
  role?: 'student' | 'teacher' | 'admin';
  provider?: 'credentials' | 'google';
  verified?: boolean;
}

export interface UserFilters {
  role?: 'student' | 'teacher' | 'admin';
  verified?: boolean;
  provider?: 'credentials' | 'google';
  createdAfter?: Date;
  createdBefore?: Date;
}
