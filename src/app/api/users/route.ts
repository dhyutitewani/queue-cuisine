// File: app/api/user/route.ts
import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb'; // use correct path

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Missing name' }, { status: 400 });
  }

  const { db } = await connectToDatabase();
  const user = await db.collection('users').findOne({ name });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({ name: user.name });
}
