/* ============================================================
   /api/layouts — the admin side of layout submissions.
   Every request needs the admin key (ADMIN_KEY environment
   variable on the Netlify site), sent as an x-admin-key header
   or ?key= query parameter.

     GET  /api/layouts           → { plans: [meta, …] } newest first
     GET  /api/layouts?id=<id>   → the full stored submission
     DELETE /api/layouts?id=<id> → removes a submission

   The full submission's planData is byte-for-byte what the
   planner's Save button writes, so the admin page can hand it
   straight back to layout.html for editing.
   ============================================================ */
import { getStore } from '@netlify/blobs';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export default async (req) => {
  const url = new URL(req.url);
  const key = req.headers.get('x-admin-key') || url.searchParams.get('key');
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey) return json({ error: 'ADMIN_KEY is not configured on the site' }, 503);
  if (key !== adminKey) return json({ error: 'Unauthorised' }, 401);

  const store = getStore('layouts');
  const id = url.searchParams.get('id');

  if (req.method === 'DELETE') {
    if (!id) return json({ error: 'id required' }, 400);
    await store.delete('plans/' + id);
    await store.delete('meta/' + id);
    return json({ ok: true });
  }

  if (req.method !== 'GET') return json({ error: 'GET or DELETE only' }, 405);

  if (id) {
    const plan = await store.get('plans/' + id, { type: 'json' });
    if (!plan) return json({ error: 'Not found' }, 404);
    return json(plan);
  }

  const { blobs } = await store.list({ prefix: 'meta/' });
  const metas = await Promise.all(
    blobs.map((b) => store.get(b.key, { type: 'json' }).catch(() => null))
  );
  const plans = metas
    .filter(Boolean)
    .sort((a, b) => String(b.submittedAt || '').localeCompare(String(a.submittedAt || '')));
  return json({ plans });
};

export const config = { path: '/api/layouts' };
