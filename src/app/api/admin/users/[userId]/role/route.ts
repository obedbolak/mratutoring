import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { updateUser } from '@/lib/auth-utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { role } = await request.json();

    if (!['student', 'teacher', 'admin'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    // Prevent admin from changing their own role
    if (session.user.id === params.userId) {
      return NextResponse.json(
        { error: 'Cannot change your own role' },
        { status: 400 }
      );
    }

    const user = await updateUser(params.userId, { role });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User role updated successfully',
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
