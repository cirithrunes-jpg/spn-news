import { NextResponse, type NextRequest } from 'next/server';
import { editorialClient } from '@/lib/supabase/server';
import { accessNotice, confirmationInput } from '@/lib/admin-access';
export async function GET(request: NextRequest) {
  if (request.nextUrl.searchParams.has('error')) {
    return NextResponse.redirect(new URL('/admin/login?aviso=' + accessNotice(request.nextUrl.searchParams.get('error_code') ?? undefined), request.url));
  }
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  if (tokenHash) {
    const input = confirmationInput(tokenHash, request.nextUrl.searchParams.get('type') ?? 'email');
    if (!input) return NextResponse.redirect(new URL('/admin/login?aviso=link-invalido', request.url));
    const target = new URL('/admin/auth/confirm', request.url);
    target.searchParams.set('token_hash', input.token_hash);
    target.searchParams.set('type', input.type);
    return NextResponse.redirect(target);
  }
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    const client = await editorialClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('recovery') === '1' ? '/admin/login/senha' : '/admin', request.url));
    return NextResponse.redirect(new URL('/admin/login?aviso=' + accessNotice(error.code), request.url));
  }
  return NextResponse.redirect(new URL('/admin/login?aviso=link-invalido', request.url));
}
