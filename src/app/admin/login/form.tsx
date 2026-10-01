'use client';

import { useActionState } from 'react';
import { login } from '../auth/actions';

export function LoginForm({ configured }: { configured: boolean; reset?: boolean }) {
  const [result, action, pending] = useActionState(login, { message: '' });

  return <>
    <form action={action} className="desk-form">
      <label>
        E-mail
        <input type="email" name="email" autoComplete="email" required maxLength={254}/>
      </label>
      {result.message && <p role="status" className={result.success ? 'desk-success' : 'desk-notice'}>{result.message}</p>}
      <button className="desk-button" disabled={!configured || pending}>
        {pending ? 'Enviando…' : 'Enviar link de acesso →'}
      </button>
    </form>
    <p className="desk-muted login-note">Sem senha: o acesso acontece por um link seguro enviado ao e-mail de uma conta autorizada da redação.</p>
  </>;
}
