import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export const POST = async (req: Request) => {
  try {
    const { db } = await connectToDatabase();
    const { email, password } = await req.json();

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    const res = NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    res.headers.set('Set-Cookie', `userEmail=${user.email}; Path=/; HttpOnly;`);
    return res;
  } catch (error: any) {
    return NextResponse.json({ message: error.message || 'Internal server error' }, { status: 500 });
  }
};
