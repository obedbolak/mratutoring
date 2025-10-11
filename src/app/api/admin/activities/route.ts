import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = await getDatabase();
    const activities = db.collection('activities');

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const activityList = await activities
      .find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({ activities: activityList });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to log activities (add to auth-utils.ts)
export async function logActivity(
  type: 'user_created' | 'user_verified' | 'user_deleted' | 'role_changed',
  userId: string,
  details: string,
  performedBy?: string
) {
  try {
    const db = await getDatabase();
    const activities = db.collection('activities');

    await activities.insertOne({
      type,
      userId,
      details,
      performedBy,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error('Error logging activity:', error);
  }
}
