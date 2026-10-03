import { getGeekEdition } from '@/lib/geek-quiz';

export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(getGeekEdition(), { headers: { 'Cache-Control': 'no-store' } });
}
