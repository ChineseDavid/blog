"use server";
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './actions';

// 强制动态路由
export const dynamic = 'force-dynamic';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.slice(0, 6) == '/admin') {
    const token = request.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      await verifyToken(token);
      return NextResponse.next();
  } catch {
      return NextResponse.redirect(new URL('/login', request.url));
  }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}