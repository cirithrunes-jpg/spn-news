import { NextResponse, type NextRequest } from 'next/server';
import { editorialClient, editorialConfigured } from '@/lib/supabase/server';

const PRIMARY_ADMIN_EMAIL = 'spnerds.oficial@gmail.com';

export async function GET(request: NextRequest) {
  if (!editorialConfigured()) {
    return NextResponse.redirect(new URL('/admin/acesso-enviado?erro=config', request.url));
  }

  const alreadyRequested = request.cookies.get('spn_admin_link_requested')?.value === '1';

  if (!alreadyRequested) {
    const client = await editorialClient();
    const { error } = await client.auth.signInWithOtp({
      email: PRIMARY_ADMIN_EMAIL,
      options: {
        emailRedirectTo: new URL('/admin/auth/callback', request.url).href,
        shouldCreateUser: false,
      },
    });

    if (error) {
      return NextResponse.redirect(new URL('/admin/acesso-enviado?erro=envio', request.url));
    }
  }

  const response = NextResponse.redirect(new URL('/admin/acesso-enviado', request.url));
  response.cookies.set('spn_admin_link_requested', '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: request.nextUrl.protocol === 'https:',
    maxAge: 60,
    path: '/',
  });
  return response;
}
