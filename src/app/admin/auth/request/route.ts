import { NextResponse, type NextRequest } from 'next/server';

// Visiting a page must not send another email or invalidate the previous link.
export async function GET(request: NextRequest) {
  return NextResponse.redirect(new URL('/admin/login', request.url));
}
