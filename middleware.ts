import { NextRequest, NextResponse } from 'next/server'

// 强制动态路由
export const dynamic = 'force-dynamic';

export function middleware(request: NextRequest) {
  if(request.nextUrl.pathname.slice(0,6) == '/admin') {
    const token = request.cookies.get('token')?.value;
    console.log('ydw token ````````````````````````',token)
    if(!token) {
      return NextResponse.redirect(new URL('/login',request.url));
    }
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}