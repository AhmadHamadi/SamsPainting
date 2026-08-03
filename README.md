# Sam's Painting — samspaintinghamilton.ca

Production Next.js 14 (App Router) site for **Sam's Painting**, a residential painting contractor
in Hamilton, Ontario. Static-generated, deployed on Vercel, with quote-form leads delivered by
Resend.

---

## ⚠️ BEFORE YOU DEPLOY — three things to change

Everything else is done. These three are waiting on client-supplied information.

| # | What | Where | Current placeholder |
|---|------|-------|---------------------|
| 1 | **Domain** | `lib/site.ts` → `DOMAIN_PLACEHOLDER` | `https://www.samspaintinghamilton.ca` |
| 2 | **Client inbox for leads** | `app/api/quote/route.ts` → `LEAD_TO` | `info@samspaintinghamilton.ca` |
| 3 | **Public email address** | `lib/site.ts` → `email` / `emailHref` | `info@samspaintinghamilton.ca` |

`lib/site.ts` is the single source of truth for the domain — every canonical URL, Open Graph tag,
sitemap entry and JSON-LD `url` derives from it, so changing that one constant re-points the whole
site. Search `llms.txt` for the domain as well; it is a static file and holds the URL literally.

### Environment variable (set in Vercel)

| Variable | Required | Purpose |
|----------|----------|---------|
| `RESEND_API_KEY` | Yes | Resend API key for quote-form delivery. Get it at https://resend.com/api-keys |

That is the only one. `LEAD_FROM` and `LEAD_TO` live in code because they are not secrets.

Without `RESEND_API_KEY` the form does not break — it falls back to opening the visitor's mail
client with the details pre-filled, so a lead is never silently lost.

### DNS for deliverability

The sending domain **`tradeleadsmarketing.com`** must stay verified in Resend. Confirm these
records exist on that domain (Resend generates the exact values):

| Type | Host | Purpose |
|------|------|---------|
| MX + TXT | `send.` subdomain | Resend bounce handling + SPF |
| TXT (SPF) | `send.` subdomain | `v=spf1 include:amazonses.com ~all` |
| TXT (DKIM) | `resend._domainkey` | DKIM public key from Resend |
| TXT (DMARC) | `_dmarc` | `v=DMARC1; p=none; rua=mailto:you@tradeleadsmarketing.com` |

Mail is sent **From** `Website Lead <info@tradeleadsmarketing.com>` (the verified domain, so
SPF/DKIM align), with **Reply-To set to the customer**, the client's inbox in **To:** (never Bcc),
and a `text/plain` part alongside the HTML. The body is deliberately plain — styled,
marketing-looking mail is far more likely to be filtered.

---

## Deploy

```bash
npm install
npm run build      # 233 pages prerendered
vercel             # or connect the GitHub repo in the Vercel dashboard
```

A `vercel` deploy of this folder needs **only `RESEND_API_KEY` set** — nothing else.

`vercel.json` already handles: apex → www 301, legacy `.html` → trailing-slash redirects, HSTS
preload, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
immutable caching for `/images` and `/_next/static`, short caching plus correct `Content-Type` for
`sitemap.xml`, `robots.txt` and `llms.txt`, and `no-store` on `/api`.

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Local dev server |
| `npm run build` | Production build (prerenders all 233 pages) |
| `npm run test:spam` | Unit-tests the B2B solicitation filter |
| `npm run audit:seo` | Duplicate titles/metas/canonicals/H1s/FAQs + body-overlap + schema validity |
| `node scripts/audit-cannibalization.mjs` | Proves every page owns a distinct primary keyword |
| `node scripts/screenshot.mjs` | Renders every page type at 1360px and 390px, flags broken images |

`audit:seo` runs against the **built HTML**, not the source, so it checks what actually ships.
Run `npm run build` first.

---

## Architecture

```
/                                     brand + "painters Hamilton"
/services/                            hub
/services/[service]/                  26 top-level services
/services/[parent]/[child]/           6 nested sub-services
/service-areas/                       hub
/service-areas/[city]/                13 city pages
/service-areas/[city]/[service]/      156 city × service pages
/cost/  /cost/[slug]/                 6 cost pages (the biggest local gap)
/solutions/  /solutions/[slug]/       6 problem/diagnosis pages
/blog/  /blog/[slug]/                 6 author-attributed guides
/about/ /contact/ /faq/ /sitemap/     trust + utility
/privacy/ /terms-of-service/          legal
/thank-you/ /message-received/        noindex, excluded from sitemap
```

**One page, one keyword.** `scripts/audit-cannibalization.mjs` maps all 219 primary keywords and
fails on any collision. Where two offerings would have targeted the same query, the narrower one
was re-scoped (e.g. "wall painting" → "accent wall painting") or nested as a sub-service.

### Key files

| File | Role |
|------|------|
| `lib/site.ts` | NAP + brand. **Single source of truth for the domain.** |
| `lib/services.ts` | 32 services with per-service prep, materials, timeline, includes |
| `lib/areas.ts` | 13 cities with verified neighbourhoods, housing stock, conditions, permits |
| `lib/faqs.ts` | FAQ generator with disjoint template pools per page type |
| `lib/content.ts` | City × service prose composition |
| `lib/pricing.ts` | Third-party market ranges **with sources** — not Sam's rate card |
| `lib/photos.ts` | Verified photo catalogue with real intrinsic dimensions |
| `lib/schema.ts` | JSON-LD builders |
| `lib/solicitation.ts` | Inbound-lead classifier (tested) |

---

## Deliberate decisions worth knowing

**No `AggregateRating` or `Review` schema anywhere.** Sam has no verified review figures.
Publishing invented ratings breaches Google's structured-data policy and is the most reliable way
to earn a manual action. When real Google Business Profile numbers exist, add `aggregateRating` to
`businessSchema()` in `lib/schema.ts` — **on the homepage graph only**, not every page.

**No `Offer` or `PriceSpecification` schema.** The figures on `/cost/` are third-party published
market ranges, each carrying its source, clearly labelled as market data rather than Sam's prices.
Marking them up as the business's own prices would be false.

**No testimonials.** The trust slots carry only claims the client confirmed: licensed, insured,
certified, free written estimates, locally owned.

**Every image was opened and visually checked** before being assigned to a page. Two candidates
were rejected at that stage: one exterior shot had palm trees in it (wrong region for a Hamilton
painter), and its replacement showed painters wearing a **competitor's branded uniform**.

**Sourcing discipline in `lib/areas.ts`.** Claims that could not be verified were dropped rather
than guessed — siding-material prevalence, housing-age percentages, freeze-thaw counts and precise
drive times have no citable source for these municipalities and so do not appear. Research also
corrected several widely-repeated errors: there is no "Queenston Street" heritage district in
St. Catharines, Kerr Village is not an Oakville HCD, Burlington has **zero** heritage districts,
and Bronte sits on Twelve Mile Creek (not Sixteen). Note also that the frequently-cited
"$4,690–$6,201 average painting cost in Hamilton" figure refers to Hamilton, **Ohio**, in USD, and
is excluded.

---

## Anti-spam

Two layers, both tested:

1. **Honeypot** — a hidden `website` field. Filled means bot.
2. **Server-side solicitation filter** (`lib/solicitation.ts`) — hard-drops agency pitch language
   ("backlinks", "link building", "first page of Google", "we came across your website"), and drops
   on two soft signals, or one soft signal plus a link.

The filter **never scans the name field**, so a customer named *Seo* is not dropped — that case is
covered by `npm run test:spam`, along with a landlord who writes "grow your business" and a
customer who pastes a Pinterest link.

Dropped submissions return `{ ok: true, dropped: true }` and are routed to `/message-received/`,
**never `/thank-you/`** — so spam cannot fire the conversion event.

---

## AEO / GEO

`public/llms.txt` carries dated atomic facts, disambiguation (Hamilton **Ontario**, not Ohio), NAP
matching `lib/site.ts` exactly, and an explicit statement that no review rating is published so
answer engines do not invent one.

`app/robots.ts` names every major search and AI crawler explicitly — Googlebot, Bingbot,
DuckDuckBot, Applebot, Google-Extended, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User,
Claude-SearchBot, anthropic-ai, PerplexityBot, CCBot, Amazonbot, Meta-ExternalAgent, MistralAI-User,
YouBot, Bytespider and others — because several only honour a rule that names them. `/api/` is
disallowed throughout.
