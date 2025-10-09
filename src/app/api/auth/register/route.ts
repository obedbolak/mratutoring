// src/app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  createUser,
  findUserByEmail,
  hashPassword,
  generateVerificationToken,
  generateTokenExpiry,
} from '../../../../lib/auth-utils';

export async function POST(request: NextRequest) {
  try {
    const {
      name,
      email,
      password,
      role = 'student',
      subjects = [],
      level,
    } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Validate role
    if (!['student', 'teacher'].includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be either student or teacher' },
        { status: 400 }
      );
    }

    // Validate subjects array
    if (!Array.isArray(subjects)) {
      return NextResponse.json(
        { error: 'Subjects must be an array' },
        { status: 400 }
      );
    }

    if (subjects.length === 0) {
      return NextResponse.json(
        { error: 'At least one subject must be selected' },
        { status: 400 }
      );
    }

    // Validate education level
    const validLevels = [
      'O-Level',
      'A-Level',
      'Cambridge IGCSE',
      'Cambridge Checkpoint',
      'International Baccalauréat',
    ];

    if (!level || !validLevels.includes(level)) {
      return NextResponse.json(
        { error: 'Valid education level is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = generateTokenExpiry();

    // Create user with profile data
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      verified: false,
      role: role as 'student' | 'teacher',
      profile: {
        subjects,
        level,
      },
      verificationToken,
      verificationTokenExpiry,
    });

    // Remove password from response
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'User created successfully',
        user: userWithoutPassword,
        verificationToken, // Include this for EmailJS
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
