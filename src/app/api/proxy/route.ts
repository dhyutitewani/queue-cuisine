// /app/api/proxy/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const backendRes = await fetch('https://localhost:8000/real-data', {
    headers: {
      'Authorization': 'Bearer token',
      // add more headers if needed
    },
  });

  const data = await backendRes.json();
  return NextResponse.json(data);
}
