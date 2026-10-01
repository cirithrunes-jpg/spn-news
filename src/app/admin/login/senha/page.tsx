import { redirect } from 'next/navigation';
import { editorialClient, editorialConfigured } from '@/lib/supabase/server';
import { LoginForm } from '../form';
export default async function PasswordPage() {
  if (!editorialConfigured()) redirect('/admin/login');
  const client = await editorialClient();
  const { data: { user } } = await client.auth.getUser();
  if (!user) redirect('/admin/login?aviso=link-invalido');
  return <main id="conteudo" className="password-box"><h1>Uma nova senha para a redação.</h1><LoginForm configured reset/></main>;
}
