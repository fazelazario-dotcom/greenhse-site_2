/* ============================================================
   POST /api/submit-layout — receives a finished customer layout
   from the planner's Send button and stores it in Netlify Blobs.

   Two blobs per submission:
     plans/<id> — the full payload (customer, schedule, plan image,
                  and planData: the same editable plan the Save
                  button writes, so we can reopen and edit it)
     meta/<id>  — a small summary + thumbnail, so the admin list
                  loads fast without pulling every full plan.

   Public endpoint (customers post here); the read side
   (/api/layouts) is what carries the admin key.
   ============================================================ */
import { getStore } from '@netlify/blobs';

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export default async (req) => {
  if (req.method !== 'POST') return json({ error: 'POST only' }, 405);

  let payload;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Body must be JSON' }, 400);
  }

  const c = payload && payload.customer;
  if (!c || !c.name || !(c.email || c.phone)) {
    return json({ error: 'A name and an email or phone number are required' }, 400);
  }

  /* Sortable id: newest submissions sort last by key, and the id
     doubles as a human-readable received-at stamp. */
  const id =
    new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19) +
    '-' + Math.random().toString(36).slice(2, 8);

  const meta = {
    id,
    submittedAt: payload.submittedAt || new Date().toISOString(),
    name: String(c.name).slice(0, 120),
    email: String(c.email || '').slice(0, 160),
    phone: String(c.phone || '').slice(0, 40),
    suburb: String(c.suburb || '').slice(0, 80),
    jobType: String(c.jobType || '').slice(0, 40),
    project: String((payload.project && payload.project.name) || '').slice(0, 120),
    fittings: (payload.schedule && payload.schedule.fittings) || 0,
    totalIncGst: (payload.schedule && payload.schedule.totalIncGst) || 0,
    hasPlanData: !!payload.planData,
    thumb: typeof payload.thumb === 'string' && payload.thumb.startsWith('data:image/')
      ? payload.thumb : null,
  };
  delete payload.thumb; // lives in meta; no point storing it twice

  const store = getStore('layouts');
  await store.setJSON('plans/' + id, payload);
  await store.setJSON('meta/' + id, meta);

  return json({ ok: true, id });
};

export const config = { path: '/api/submit-layout' };
