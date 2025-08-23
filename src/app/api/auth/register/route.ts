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
    const { name, email, password, role = 'student' } = await request.json();

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
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

    // Create user
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      verified: false,
      role: role as 'student' | 'teacher',
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
