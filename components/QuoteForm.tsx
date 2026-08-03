'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { site } from '@/lib/site';
import { topServices } from '@/lib/services';
import { cities } from '@/lib/areas';

type Props = {
  compact?: boolean;
  defaultService?: string;
  defaultCity?: string;
  /** Heading shown in the form's coloured header bar. */
  title?: string;
  id?: string;
};

const ENDPOINT = site.formEndpoint || '/api/quote';

/**
 * The site's single lead form.
 *
 * Conversion notes: six fields only (research on home-services forms is
 * consistent that fewer fields convert better), the service and city
 * pre-selected from the page you're on, and a phone alternative always visible
 * for people who would rather call.
 *
 * Anti-spam: a honeypot field here, plus a server-side solicitation filter in
 * /api/quote. Critically, a submission the server DROPS never reaches
 * /thank-you/, so bot traffic cannot fire the conversion event.
 */
export default function QuoteForm({
  compact = false,
  defaultService,
  defaultCity,
  title = 'Get Your Free Quote',
  id,
}: Props) {
  const router = useRouter();
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: defaultCity ?? '',
    service: defaultService ?? '',
    message: '',
    website: '', // honeypot — real users never see this
  });

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const canSubmit =
    form.name.trim() && form.phone.trim() && form.email.trim() && form.message.trim();

  function mailtoFallback() {
    const body = encodeURIComponent(
      [
        'New quote request',
        '',
        `Name: ${form.name}`,
        `Phone: ${form.phone}`,
        `Email: ${form.email}`,
        `City: ${form.city || 'Not specified'}`,
        `Service: ${form.service || 'Not specified'}`,
        '',
        'Message:',
        form.message,
      ].join('\n'),
    );
    window.location.href = `${site.emailHref}?subject=${encodeURIComponent(
      'Free Quote Request' + (form.service ? ` — ${form.service}` : ''),
    )}&body=${body}`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || sending) return;
    setSending(true);
    setError('');

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}) as { ok?: boolean; dropped?: boolean });

      if (res.ok && data.ok && !data.dropped) {
        router.push('/thank-you/'); // the ONLY path that fires the conversion
        return;
      }
      if (data.dropped) {
        // Honeypot or solicitation filter. Show a neutral, non-committal end
        // state — deliberately NOT the thank-you page.
        router.push('/message-received/');
        return;
      }
      // Server could not send (not configured, or the API errored).
      setSending(false);
      mailtoFallback();
    } catch {
      setSending(false);
      mailtoFallback();
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-card"
      noValidate={false}
    >
      <div className="border-b border-navy/10 bg-navy px-5 py-4 text-white">
        <p className="font-display text-lg font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-slate-light/80">
          Free, no obligation — we reply within one business day
        </p>
      </div>

      <div className={`space-y-3 ${compact ? 'p-5' : 'p-6'}`}>
        {/* Honeypot. Hidden from people, catches naive bots. */}
        <div className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="website-field">Leave this field empty</label>
          <input
            id="website-field"
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => set('website', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="qf-name" className="mb-1 block text-sm font-semibold text-navy-900">
            Name <span className="text-gold-dark">*</span>
          </label>
          <input
            id="qf-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className="field"
            placeholder="Your name"
          />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-phone" className="mb-1 block text-sm font-semibold text-navy-900">
              Phone <span className="text-gold-dark">*</span>
            </label>
            <input
              id="qf-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => set('phone', e.target.value)}
              className="field"
              placeholder="(289) 000-0000"
            />
          </div>
          <div>
            <label htmlFor="qf-email" className="mb-1 block text-sm font-semibold text-navy-900">
              Email <span className="text-gold-dark">*</span>
            </label>
            <input
              id="qf-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => set('email', e.target.value)}
              className="field"
              placeholder="you@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor="qf-city" className="mb-1 block text-sm font-semibold text-navy-900">
              City or town
            </label>
            <select
              id="qf-city"
              name="city"
              value={form.city}
              onChange={(e) => set('city', e.target.value)}
              className="field"
            >
              <option value="">Select your area</option>
              {cities.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
              <option value="Elsewhere nearby">Elsewhere nearby</option>
            </select>
          </div>
          <div>
            <label htmlFor="qf-service" className="mb-1 block text-sm font-semibold text-navy-900">
              What do you need?
            </label>
            <select
              id="qf-service"
              name="service"
              value={form.service}
              onChange={(e) => set('service', e.target.value)}
              className="field"
            >
              <option value="">Select a service</option>
              {topServices.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="qf-message" className="mb-1 block text-sm font-semibold text-navy-900">
            Tell us about the job <span className="text-gold-dark">*</span>
          </label>
          <textarea
            id="qf-message"
            name="message"
            rows={compact ? 2 : 3}
            required
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            className="field resize-none"
            placeholder="e.g. Two bedrooms and a hallway, walls and ceilings, hoping for early next month."
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={!canSubmit || sending}
          className="btn-gold w-full disabled:cursor-not-allowed disabled:opacity-40"
        >
          {sending ? (
            'Sending…'
          ) : (
            <>
              Get My Free Quote <Icon name="arrow" size={18} />
            </>
          )}
        </button>

        <p className="text-center text-[0.7rem] leading-relaxed text-slate">
          No obligation. Your details are only used to prepare your quote. Prefer to talk?{' '}
          <a href={site.phoneHref} className="font-semibold text-navy underline">
            Call {site.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
