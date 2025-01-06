import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectToDatabase } from '../../../../lib/mongodb';

export const POST = async (req: Request) => {
  try {
    // Connect to MongoDB
    const { db } = await connectToDatabase();

    // Parse the incoming request body
    const { name, email, password } = await req.json();

    // Basic Validation
    if (!email || !password || !name) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Check if the email is valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Insert the new user into the users collection
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const result = await db.collection('users').insertOne(newUser);

    // Return response based on result
    if (result.acknowledged) {
      return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } else {
      return NextResponse.json({ message: 'User creation failed' }, { status: 500 });
    }
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
