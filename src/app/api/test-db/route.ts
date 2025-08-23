// src/app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import {
  createUser,
  updateUser,
  getUserCount,
  findUsersByRole,
} from '../../../lib/auth-utils';

export async function GET() {
  try {
    // Test basic connection
    const userCount = await getUserCount();
    console.log('Total users:', userCount);

    // Test finding users by role
    const students = await findUsersByRole('student');
    console.log('Students found:', students.length);

    return NextResponse.json({
      success: true,
      userCount,
      studentsCount: students.length,
      message: 'Database connection successful',
    });
  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Database connection failed',
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    // Test user creation and update
    const testUser = await createUser({
      name: 'Test User',
      email: `test-${Date.now()}@example.com`,
      password: 'test123456',
      provider: 'credentials',
      verified: false,
      role: 'student',
    });

    console.log('Created test user:', testUser._id);

    // Test update operation
    const updatedUser = await updateUser(testUser._id!.toString(), {
      verified: true,
      name: 'Updated Test User',
    });

    console.log('Updated user:', updatedUser);

    return NextResponse.json({
      success: true,
      createdUser: { ...testUser, password: undefined }, // Don't return password
      updatedUser: updatedUser ? { ...updatedUser, password: undefined } : null,
      message: 'User operations successful',
    });
  } catch (error) {
    console.error('User operation test error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'User operations failed',
      },
      { status: 500 }
    );
  }
}
