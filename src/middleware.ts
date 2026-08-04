import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('token')?.value;

  const pathname =
    request.nextUrl.pathname;

  const isProtected =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/books');

  const isAuth =
    pathname.startsWith('/signin') ||
    pathname.startsWith('/signup');

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL('/signin', request.url)
    );
  }

  if (isAuth && token) {
    return NextResponse.redirect(
      new URL('/dashboard', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/books/:path*',
    '/signin',
    '/signup',
  ],
};