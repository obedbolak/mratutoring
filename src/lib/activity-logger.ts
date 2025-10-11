import { getDatabase } from '@/lib/mongodb';

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
