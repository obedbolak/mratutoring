import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { verifyUserEmail } from '@/lib/auth-utils';

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await verifyUserEmail(params.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'User verified successfully',
      user: { ...user, password: undefined },
    });
  } catch (error) {
    console.error('Error verifying user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
