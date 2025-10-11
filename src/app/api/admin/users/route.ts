import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';
import { User } from '@/types/user';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const users = db.collection<User>('users');

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const verified = searchParams.get('verified');
    const limit = parseInt(searchParams.get('limit') || '100');
    const skip = parseInt(searchParams.get('skip') || '0');

    // Build query
    const query: any = {};
    if (role && role !== 'all') {
      query.role = role;
    }
    if (verified && verified !== 'all') {
      query.verified = verified === 'true';
    }

    // Fetch users
    const userList = await users
      .find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .project({ password: 0 }) // Exclude password
      .toArray();

    const total = await users.countDocuments(query);

    return NextResponse.json({
      users: userList,
      total,
      limit,
      skip,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
