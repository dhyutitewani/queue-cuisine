import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';
import User from '../../../../models/User';

export const POST = async (req: Request) => {
  try {
    const { db } = await connectToDatabase();
    const { email, password } = await req.json();

    // Check if the user exists
    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    // Return success message if credentials are valid
    return NextResponse.json({ message: 'Login successful', user });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
