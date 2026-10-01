import { NextResponse, type NextRequest } from 'next/server';
import { editorialClient } from '@/lib/supabase/server';
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    const client = await editorialClient();
    const { error } = await client.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(request.nextUrl.searchParams.get('recovery') === '1' ? '/admin/login/senha' : '/admin', request.url));
  }
  return NextResponse.redirect(new URL('/admin/login?aviso=link-invalido', request.url));
}
