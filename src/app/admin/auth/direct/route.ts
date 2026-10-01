import { NextResponse, type NextRequest } from 'next/server';
import { editorialClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  if (!tokenHash) return NextResponse.redirect(new URL('/', request.url));

  const client = await editorialClient();
  const { error } = await client.auth.verifyOtp({
    token_hash: tokenHash,
    type: 'magiclink',
  });

  if (error) return NextResponse.redirect(new URL('/', request.url));
  return NextResponse.redirect(new URL('/admin', request.url));
}
