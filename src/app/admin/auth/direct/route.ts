import { NextResponse, type NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  const target = new URL('/admin/auth/confirm', request.url);
  if (tokenHash) target.searchParams.set('token_hash', tokenHash);
  target.searchParams.set('type', 'magiclink');
  return NextResponse.redirect(target);
}
