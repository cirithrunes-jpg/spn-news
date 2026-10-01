'use client';
import { usePathname } from 'next/navigation';
export default function PublicShell({ header, footer, children }: { header: React.ReactNode; footer: React.ReactNode; children: React.ReactNode }) {
  const internal = usePathname().startsWith('/admin');
  return <>{!internal && header}{children}{!internal && footer}</>;
}
