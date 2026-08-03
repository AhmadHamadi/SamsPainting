// ---------------------------------------------------------------------------
// Quote-form lead delivery via the Resend API (https://resend.com).
//
// Reusable across client sites: ONE verified sending domain in Resend
// (tradeleadsmarketing.com), then set LEAD_FROM + LEAD_TO per site below.
// The only secret, RESEND_API_KEY, comes from the Vercel environment.
// ---------------------------------------------------------------------------
import { classify } from '@/lib/solicitation';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ───────────────────────────────────────────────────────────────────────────
// PER-SITE SETTINGS (not secrets — safe to commit).
//   LEAD_FROM: an address on the VERIFIED Resend domain. Sending from the
//              verified domain is what keeps SPF/DKIM aligned and lands the
//              mail in the inbox instead of the spam folder.
//   LEAD_TO:   where THIS client's leads are delivered.
// ───────────────────────────────────────────────────────────────────────────
const LEAD_FROM = 'Website Lead <info@tradeleadsmarketing.com>';

// ⚠️ TODO BEFORE LAUNCH — replace with Sam's real inbox (client is sending it).
// This is the ONLY line that needs to change to route leads to the client.
const LEAD_TO = 'info@samspaintinghamilton.ca';

type Lead = {
  name?: string;
  phone?: string;
  email?: string;
  city?: string;
  service?: string;
  message?: string;
  website?: string; // honeypot — real users never see or fill this
  company?: string; // secondary honeypot
};

const esc = (s = '') =>
  s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string);

// ── Rate limiting ──────────────────────────────────────────────────────────
// In-memory and therefore per-instance, which is the right trade-off here:
// it costs nothing, needs no external store, and blunts the burst floods that
// actually hit small contractor sites. Serious abuse is Vercel's WAF's job.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 5_000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }
  return recent.length > MAX_PER_WINDOW;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for');
  return (fwd ? fwd.split(',')[0] : req.headers.get('x-real-ip') || 'unknown').trim();
}

export async function POST(req: Request) {
  let data: Lead;
  try {
    data = await req.json();
  } catch {
    return Response.json({ ok: false, reason: 'bad_request' }, { status: 400 });
  }

  // ── Honeypot ─────────────────────────────────────────────────────────────
  // Answer 200 with `dropped` so the bot sees success and moves on, while the
  // browser knows not to navigate to /thank-you/ (which fires the conversion).
  if (data.website || data.company) {
    return Response.json({ ok: true, dropped: true });
  }

  if (rateLimited(clientIp(req))) {
    return Response.json({ ok: false, reason: 'rate_limited' }, { status: 429 });
  }

  const name = (data.name || '').trim();
  const phone = (data.phone || '').trim();
  const email = (data.email || '').trim();
  const message = (data.message || '').trim();
  if (!name || !phone || !email || !message) {
    return Response.json({ ok: false, reason: 'missing_fields' }, { status: 422 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return Response.json({ ok: false, reason: 'bad_email' }, { status: 422 });
  }

  // ── B2B solicitation filter ──────────────────────────────────────────────
  // Agencies pitching SEO/web-design at the business get dropped here. Note
  // the classifier never scans the NAME field, so a customer named Seo is safe.
  const verdict = classify(data);
  if (verdict.spam) {
    console.warn('[quote] solicitation dropped:', verdict.reason);
    return Response.json({ ok: true, dropped: true });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    // Not configured yet -> the form falls back to opening the user's mail app.
    return Response.json({ ok: false, reason: 'not_configured' }, { status: 501 });
  }

  const service = (data.service || 'Not specified').trim();
  const city = (data.city || '').trim();

  // Deliberately plain. A styled, image-heavy, marketing-looking email is far
  // more likely to be filtered as spam than a short text one.
  const text = [
    'New quote request from the website.',
    '',
    `Name:    ${name}`,
    `Phone:   ${phone}`,
    `Email:   ${email}`,
    `Service: ${service}`,
    ...(city ? [`City:    ${city}`] : []),
    '',
    'Message:',
    message,
    '',
    `Reply to this email to respond directly to ${name}.`,
  ].join('\n');

  const html =
    `<p>New quote request from the website.</p>` +
    `<p>Name: ${esc(name)}<br>` +
    `Phone: ${esc(phone)}<br>` +
    `Email: ${esc(email)}<br>` +
    `Service: ${esc(service)}` +
    (city ? `<br>City: ${esc(city)}` : '') +
    `</p>` +
    `<p>Message:<br>${esc(message).replace(/\n/g, '<br>')}</p>` +
    `<p>Reply to this email to respond to ${esc(name)}.</p>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: LEAD_FROM, // on the verified Resend domain -> SPF/DKIM aligned
        to: [LEAD_TO], // real recipient in To:, never Bcc:
        reply_to: `${name} <${email}>`, // hitting Reply answers the customer
        subject: `New painting enquiry from ${name}${city ? ` (${city})` : ''}`,
        text, // text/plain part included for deliverability
        html,
      }),
    });
    if (res.ok) return Response.json({ ok: true });
    console.error('Resend send failed:', res.status, await res.text());
    return Response.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  } catch (err) {
    console.error('Resend request error:', err);
    return Response.json({ ok: false, reason: 'send_failed' }, { status: 502 });
  }
}
