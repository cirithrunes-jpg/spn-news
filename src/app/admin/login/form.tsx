'use client';

import { useActionState } from 'react';
import { requestAdminAccess } from '../auth/actions';

export function LoginForm({ configured }: { configured: boolean; reset?: boolean }) {
  const [result, action, pending] = useActionState(requestAdminAccess, { message: '' });

  return <form action={action} className="desk-form">
    {result.message && <p role="status" className={result.success ? 'desk-success' : 'desk-notice'}>{result.message}</p>}
    <button className="desk-button" disabled={!configured || pending}>
      {pending ? 'Enviando acesso…' : 'Abrir acesso do ADM →'}
    </button>
  </form>;
}
