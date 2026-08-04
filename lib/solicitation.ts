// ---------------------------------------------------------------------------
// Inbound-lead classifier.
//
// Painting contractors get buried in agency spam ("we can get you on page 1 of
// Google"). This module decides whether a submission is a real homeowner or a
// B2B pitch, so the pitch never reaches the client's inbox AND never fires a
// conversion event.
//
// It lives in lib/ (not inside the route) so it can be unit-tested directly:
//   node --test scripts/solicitation.test.mjs
//
// Design rule: FALSE NEGATIVES ARE CHEAP, FALSE POSITIVES ARE EXPENSIVE.
// Dropping a real customer costs the client a job, so every signal below is
// scoped to phrasing a homeowner booking a painter would never produce.
// ---------------------------------------------------------------------------

export type Submission = {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  service?: string;
  message?: string;
};

export type Verdict = {
  spam: boolean;
  /** Why it was dropped — logged server-side only, never shown to the sender. */
  reason?: string;
};

/**
 * Phrases a homeowner asking for a paint quote would never write. Any single
 * one of these is enough to drop the submission.
 *
 * Each entry is a regex tested against the MESSAGE BODY ONLY (never the name
 * field) so that a person named Seo, Lynk, Bing or Wordpress is unaffected.
 */
const HARD_SIGNALS: { re: RegExp; label: string }[] = [
  // "SEO" only as a standalone token — "Seo" as a surname lives in the name
  // field, which we never scan, and words like "season" must not match.
  { re: /\bseo\b/i, label: 'seo' },
  { re: /\bs\.?e\.?o\.?\s+(services?|expert|agency|company|audit|packages?)\b/i, label: 'seo-services' },
  { re: /\bback[\s-]?links?\b/i, label: 'backlinks' },
  { re: /\blink[\s-]?building\b/i, label: 'link-building' },
  { re: /\bguest[\s-]?post(ing|s)?\b/i, label: 'guest-post' },
  { re: /\bweb(site)?[\s-]?(design|development|developer|redesign)\b/i, label: 'web-design' },
  { re: /\bdigital[\s-]?marketing\b/i, label: 'digital-marketing' },
  { re: /\brank(ing)?\s+(you\s+)?(higher\s+)?on\s+google\b/i, label: 'rank-on-google' },
  { re: /\b(first|1st|top)\s+page\s+of\s+google\b/i, label: 'first-page-google' },
  { re: /\bwe\s+(came|stumbled)\s+(across|upon)\s+your\s+(website|site|business)\b/i, label: 'came-across' },
  { re: /\bi\s+was\s+(browsing|looking\s+at)\s+your\s+website\b/i, label: 'browsing-your-site' },
  { re: /\bword[\s-]?press\b/i, label: 'wordpress' },
  { re: /\blead[\s-]?gen(eration)?\b/i, label: 'lead-generation' },
  { re: /\bsocial[\s-]?media\s+(management|marketing|packages?)\b/i, label: 'smm' },
  { re: /\b(google|business)\s+listing\s+(service|optimi[sz]ation)\b/i, label: 'listing-service' },
  { re: /\bdomain\s+(authority|rating)\b/i, label: 'domain-authority' },
  { re: /\bwhite[\s-]?label\b/i, label: 'white-label' },
  { re: /\boutsourc(e|ing)\b/i, label: 'outsourcing' },
  { re: /\bcrypto|bitcoin|forex\b/i, label: 'crypto' },
  // ── Additional patterns seen in real contractor inboxes ──
  { re: /\bsearch\s+engine\s+optimi[sz]ation\b/i, label: 'seo-longform' },
  { re: /\bgoogle\s+(ranking|rankings|position)\b/i, label: 'google-ranking' },
  { re: /\b(increase|improve|boost)\s+(your\s+)?(website\s+)?traffic\b/i, label: 'boost-traffic' },
  { re: /\byour\s+(website|site)\s+is\s+not\s+(mobile[\s-]?friendly|ranking|optimi[sz]ed|secure)\b/i, label: 'site-not-x' },
  { re: /\bmobile[\s-]?friendly\s+(website|design)\b/i, label: 'mobile-friendly-pitch' },
  { re: /\b(logo|banner|flyer|brochure)\s+design(ing)?\s+(service|company)\b/i, label: 'design-service' },
  { re: /\bapp\s+develop(ment|er)\b/i, label: 'app-dev' },
  { re: /\b(hire|dedicated)\s+(a\s+)?(developer|designer|virtual\s+assistant)\b/i, label: 'hire-dev' },
  { re: /\bbulk\s+(email|sms|whatsapp)\b/i, label: 'bulk-messaging' },
  { re: /\bemail\s+(marketing|list|database)\s+(service|package|for\s+sale)\b/i, label: 'email-marketing' },
  { re: /\bb2b\s+(leads?|database|list)\b/i, label: 'b2b-list' },
  { re: /\byour\s+domain\s+(is\s+)?(expiring|about\s+to\s+expire)\b/i, label: 'domain-scam' },
  { re: /\bbusiness\s+(loan|funding|capital)\b/i, label: 'loan-offer' },
  { re: /\bmerchant\s+(cash\s+advance|services)\b/i, label: 'merchant-services' },
  { re: /\b(google|facebook)\s+ads?\s+(management|campaign|expert|specialist)\b/i, label: 'ppc-pitch' },
  { re: /\bai\s+(chatbot|automation|agent)\s+(for\s+your\s+business|solution)\b/i, label: 'ai-pitch' },
  { re: /\bunsubscribe\b/i, label: 'unsubscribe' },
  { re: /\bnot\s+interested\?\s*(reply|click)/i, label: 'optout-footer' },
];

/**
 * Individually innocent, but agency-shaped. Two of these (or one plus a link)
 * drops the submission. A homeowner might say "no obligation" once; they will
 * not also offer to "grow your business".
 */
const SOFT_SIGNALS: { re: RegExp; label: string }[] = [
  { re: /\bmore\s+(leads|customers|clients|traffic)\b/i, label: 'more-leads' },
  { re: /\bgrow\s+your\s+(business|company|revenue|sales)\b/i, label: 'grow-business' },
  { re: /\bfree\s+(audit|analysis|consultation|report|proposal|trial)\b/i, label: 'free-audit' },
  { re: /\bno\s+obligation\b/i, label: 'no-obligation' },
  { re: /\bincrease\s+your\s+(sales|revenue|visibility|conversions?)\b/i, label: 'increase-sales' },
  { re: /\bour\s+(team|agency|company)\s+(can|specialis|speciali[sz]es)\b/i, label: 'our-agency' },
  { re: /\bportfolio\s+of\s+(our\s+)?work\b/i, label: 'portfolio' },
  { re: /\baffordable\s+(price|rate|package)s?\b/i, label: 'affordable-packages' },
  { re: /\binterested\s+in\s+(working|partnering)\s+with\b/i, label: 'partnering' },
  { re: /\breply\s+(back\s+)?(with\s+)?["']?(yes|interested)["']?\b/i, label: 'reply-yes' },
  { re: /\bif\s+you('re|\s+are)\s+interested,?\s+(let\s+me\s+know|reply)\b/i, label: 'if-interested' },
  { re: /\bcase\s+stud(y|ies)\b/i, label: 'case-study' },
  // These three read as agency boilerplate but a real customer can produce
  // them — a formal older client opening with "Dear Sir/Madam", or someone
  // offering a WhatsApp number. Soft, so genuine painting language rescues.
  { re: /\bdear\s+(sir|madam|sir\/madam|business\s+owner|website\s+owner)\b/i, label: 'dear-sir' },
  { re: /\bto\s+whom\s+it\s+may\s+concern\b/i, label: 'to-whom' },
  { re: /\b(telegram|whats?app|skype)\s*(id\b|:|@)/i, label: 'im-handle' },
];

/** A URL anywhere in the message. Homeowners rarely paste links; agencies do. */
const LINK_RE = /(https?:\/\/|www\.)[^\s]+/i;

/**
 * Homeowner vocabulary. Presence of real job language is a strong signal that a
 * message is genuine, and rescues an otherwise borderline soft-signal count.
 */
const CUSTOMER_SIGNALS =
  /\b(paint|painting|painter|repaint|colour|color|primer|stain|staining|cabinet|kitchen|bedroom|bathroom|living\s+room|basement|ceiling|wall|trim|baseboard|drywall|deck|fence|door|garage|stucco|siding|exterior|interior|condo|townhouse|bungalow|semi|quote|estimate|square\s+feet|sq\.?\s?ft|coats?|wallpaper|popcorn|crown\s+moulding|touch[\s-]?up|move[\s-]?(in|out))\b/i;

export function classify(sub: Submission): Verdict {
  // Only the free-text body is scanned for solicitation language. The name
  // field is deliberately excluded: "Seo" is a common Korean surname, and
  // dropping a real customer called Seo would be a costly false positive.
  const body = `${sub.message ?? ''}`;
  const subject = `${sub.service ?? ''} ${sub.city ?? ''}`;

  if (!body.trim()) return { spam: false };

  for (const { re, label } of HARD_SIGNALS) {
    if (re.test(body) || re.test(subject)) return { spam: true, reason: `hard:${label}` };
  }

  const soft = SOFT_SIGNALS.filter(({ re }) => re.test(body)).map((s) => s.label);
  const hasLink = LINK_RE.test(body);
  const soundsLikeACustomer = CUSTOMER_SIGNALS.test(body);

  // Two soft signals, or one soft signal plus a link, means a pitch — unless
  // the message also talks about an actual painting job, which no agency
  // template does.
  if (!soundsLikeACustomer) {
    if (soft.length >= 2) return { spam: true, reason: `soft:${soft.join(',')}` };
    if (soft.length === 1 && hasLink) return { spam: true, reason: `soft+link:${soft[0]}` };
  }

  return { spam: false };
}
