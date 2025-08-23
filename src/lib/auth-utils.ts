// src/lib/auth-utils.ts
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDatabase } from './mongodb';
import { User } from '../types/user';

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(payload: Record<string, unknown>): string {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' });
}

export function verifyToken(token: string): Record<string, unknown> {
  return jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>;
}

export async function createUser(
  userData: Omit<User, '_id' | 'createdAt' | 'updatedAt'>
): Promise<User> {
  const db = await getDatabase();
  const users = db.collection<User>('users');

  const user: User = {
    ...userData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await users.insertOne(user);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const db = await getDatabase();
  const users = db.collection<User>('users');
  return await users.findOne({ email });
}

export async function findUserById(id: string): Promise<User | null> {
  const db = await getDatabase();
  const users = db.collection<User>('users');
  return await users.findOne({ _id: new ObjectId(id) });
}

export async function updateUser(
  id: string,
  updates: Partial<User>
): Promise<User | null> {
  const db = await getDatabase();
  const users = db.collection<User>('users');

  const result = await users.findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function updateUserByEmail(
  email: string,
  updates: Partial<User>
): Promise<User | null> {
  const db = await getDatabase();
  const users = db.collection<User>('users');

  const result = await users.findOneAndUpdate(
    { email },
    { $set: { ...updates, updatedAt: new Date() } },
    { returnDocument: 'after' }
  );

  return result || null;
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');
    const result = await users.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  } catch (error) {
    console.error('Error deleting user:', error);
    return false;
  }
}

export async function getUserCount(): Promise<number> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');
    return await users.countDocuments();
  } catch (error) {
    console.error('Error getting user count:', error);
    return 0;
  }
}

export async function findUsersByRole(
  role: 'student' | 'teacher' | 'admin'
): Promise<User[]> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');
    return await users.find({ role }).toArray();
  } catch (error) {
    console.error('Error finding users by role:', error);
    return [];
  }
}

export async function verifyUserEmail(userId: string): Promise<User | null> {
  return await updateUser(userId, { verified: true });
}

export async function updateUserProfile(
  userId: string,
  profileData: User['profile']
): Promise<User | null> {
  return await updateUser(userId, { profile: profileData });
}

export async function changeUserPassword(
  userId: string,
  newPassword: string
): Promise<User | null> {
  const hashedPassword = await hashPassword(newPassword);
  return await updateUser(userId, { password: hashedPassword });
}

// ========== EMAIL VERIFICATION FUNCTIONS ==========

export function generateVerificationToken(): string {
  return crypto.randomUUID();
}

export function generateTokenExpiry(hours: number = 24): Date {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
}

export async function setVerificationToken(
  email: string
): Promise<{ token: string; expiry: Date }> {
  const token = generateVerificationToken();
  const expiry = generateTokenExpiry();

  await updateUserByEmail(email, {
    verificationToken: token,
    verificationTokenExpiry: expiry,
  });

  return { token, expiry };
}

export async function findUserByVerificationToken(
  token: string
): Promise<User | null> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');

    const user = await users.findOne({
      verificationToken: token,
      verificationTokenExpiry: { $gt: new Date() }, // Token hasn't expired
    });

    return user;
  } catch (error) {
    console.error('Error finding user by verification token:', error);
    return null;
  }
}

export async function verifyEmailWithToken(
  token: string
): Promise<User | null> {
  try {
    const user = await findUserByVerificationToken(token);

    if (!user) {
      return null;
    }

    // Update user as verified and remove verification token
    const updatedUser = await updateUser(user._id!.toString(), {
      verified: true,
      verificationToken: undefined,
      verificationTokenExpiry: undefined,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error verifying email with token:', error);
    return null;
  }
}

export async function isVerificationTokenValid(
  token: string
): Promise<boolean> {
  const user = await findUserByVerificationToken(token);
  return !!user;
}

export async function clearVerificationToken(
  userId: string
): Promise<User | null> {
  return await updateUser(userId, {
    verificationToken: undefined,
    verificationTokenExpiry: undefined,
  });
}

// ========== PASSWORD RESET FUNCTIONS (BONUS) ==========

export async function setPasswordResetToken(
  email: string
): Promise<{ token: string; expiry: Date } | null> {
  const user = await findUserByEmail(email);
  if (!user) {
    return null;
  }

  const token = generateVerificationToken();
  const expiry = generateTokenExpiry(1); // 1 hour for password reset

  await updateUserByEmail(email, {
    resetPasswordToken: token,
    resetPasswordExpiry: expiry,
  });

  return { token, expiry };
}

export async function findUserByResetToken(
  token: string
): Promise<User | null> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');

    const user = await users.findOne({
      resetPasswordToken: token,
      resetPasswordExpiry: { $gt: new Date() },
    });

    return user;
  } catch (error) {
    console.error('Error finding user by reset token:', error);
    return null;
  }
}

export async function resetPasswordWithToken(
  token: string,
  newPassword: string
): Promise<User | null> {
  try {
    const user = await findUserByResetToken(token);

    if (!user) {
      return null;
    }

    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear reset token
    const updatedUser = await updateUser(user._id!.toString(), {
      password: hashedPassword,
      resetPasswordToken: undefined,
      resetPasswordExpiry: undefined,
    });

    return updatedUser;
  } catch (error) {
    console.error('Error resetting password with token:', error);
    return null;
  }
}

// ========== HELPER FUNCTIONS ==========

export async function isEmailTaken(
  email: string,
  excludeUserId?: string
): Promise<boolean> {
  const db = await getDatabase();
  const users = db.collection<User>('users');

  const query: { email: string; _id?: { $ne: ObjectId } } = { email };
  if (excludeUserId) {
    query._id = { $ne: new ObjectId(excludeUserId) };
  }

  const user = await users.findOne(query);
  return !!user;
}
// src/lib/auth-utils.ts - Update the getUserStats function
export async function getUserStats(): Promise<{
  total: number;
  verified: number;
  unverified: number;
  byRole: { student: number; teacher: number; admin: number };
}> {
  try {
    const db = await getDatabase();
    const users = db.collection<User>('users');

    const [total, verified, unverified, students, teachers, admins] =
      await Promise.all([
        users.countDocuments(),
        users.countDocuments({ verified: true }),
        users.countDocuments({ verified: false }),
        users.countDocuments({ role: 'student' }),
        users.countDocuments({ role: 'teacher' }),
        users.countDocuments({ role: 'admin' }),
      ]);

    return {
      total,
      verified,
      unverified,
      byRole: {
        student: students,
        teacher: teachers,
        admin: admins,
      },
    };
  } catch (error) {
    console.error('Error getting user stats:', error);
    return {
      total: 0,
      verified: 0,
      unverified: 0,
      byRole: { student: 0, teacher: 0, admin: 0 },
    };
  }
}
