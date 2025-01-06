import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Prevent users from accessing the admin page without being authenticated
  if (url.pathname.startsWith('/admin')) {
    const token = req.cookies.get('auth-token'); // Assumed token storage

    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
