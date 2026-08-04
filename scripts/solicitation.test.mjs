// Validates the inbound-lead classifier against real-world message shapes.
//   npm run test:spam
//
// The two failure modes are not equal. Letting an agency pitch through is an
// annoyance; dropping a homeowner loses Sam a job. The CUSTOMERS block below is
// therefore the one that matters most, and it includes the edge cases that
// naive keyword filters get wrong.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { classify } from '../lib/solicitation.ts';

// ── Must be DROPPED: real B2B solicitation patterns ────────────────────────
const SOLICITATIONS = [
  {
    label: 'classic SEO cold pitch',
    sub: {
      name: 'Rahul Sharma',
      email: 'rahul@growthagency.io',
      message:
        'Hello, we came across your website and noticed it is not ranking on Google for your main keywords. Our SEO team can help you get on the first page of Google. Would you be interested in a free audit?',
    },
  },
  {
    label: 'backlink / guest post spam',
    sub: {
      name: 'Marketing Team',
      email: 'outreach@linkfarm.net',
      message:
        'We offer high quality backlinks and guest post placements on DA 50+ sites. Link building packages start at $199/month. Reply back with "yes" if interested.',
    },
  },
  {
    label: 'web design pitch',
    sub: {
      name: 'Jessica',
      email: 'jessica@webstudio.co',
      message:
        'I was browsing your website and think a redesign could bring you more leads. We do web design and development on WordPress. Here is our portfolio of our work: https://webstudio.co/portfolio',
    },
  },
  {
    label: 'soft-signal stack, no hard keyword',
    sub: {
      name: 'Daniel',
      email: 'dan@example.biz',
      message:
        'Hi there! Our team specialises in helping local businesses grow your business and get more customers. We offer a free consultation with no obligation. Interested in working with us?',
    },
  },
  {
    label: 'one soft signal plus a link',
    sub: {
      name: 'Alex',
      email: 'alex@agency.xyz',
      message: 'We can get you more leads this quarter. See https://agency.xyz for details.',
    },
  },
  {
    label: 'digital marketing / lead gen',
    sub: {
      name: 'Priya',
      email: 'priya@leadhub.io',
      message:
        'We run digital marketing and lead generation campaigns for contractors. Case studies available on request.',
    },
  },
  {
    label: 'solicitation hidden in the service field',
    sub: {
      name: 'Bot',
      email: 'bot@spam.io',
      service: 'SEO services',
      message: 'Please check the attached proposal for your business.',
    },
  },
  {
    label: 'search engine optimisation spelled out',
    sub: {
      name: 'Vikram',
      email: 'v@agency.in',
      message:
        'Dear Sir/Madam, we provide search engine optimisation and can improve your Google ranking within 3 months.',
    },
  },
  {
    label: 'site-is-not-mobile-friendly pitch',
    sub: {
      name: 'Kevin',
      email: 'kevin@devshop.co',
      message:
        'Hi, I noticed your website is not mobile friendly. We build mobile friendly websites at affordable prices. Shall I send a proposal?',
    },
  },
  {
    label: 'domain expiry scam',
    sub: {
      name: 'Domain Services',
      email: 'billing@domain-renewals.net',
      message: 'Your domain is expiring in 48 hours. Click here to renew immediately.',
    },
  },
  {
    label: 'business loan / merchant cash advance',
    sub: {
      name: 'Funding Team',
      email: 'offers@capitalfast.co',
      message: 'You are pre-approved for a business loan of up to $250,000. No obligation to accept.',
    },
  },
  {
    label: 'Google Ads management pitch',
    sub: {
      name: 'Sofia',
      email: 'sofia@ppcpros.io',
      message:
        'We are a Google Ads management specialist agency. Our team can cut your cost per lead. Free audit available.',
    },
  },
  {
    label: 'AI chatbot pitch with WhatsApp handle',
    sub: {
      name: 'Ravi',
      email: 'ravi@aisolutions.biz',
      message:
        'We offer an AI chatbot for your business to capture leads 24/7. WhatsApp: +91 98765 43210',
    },
  },
  {
    label: 'B2B lead list vendor',
    sub: {
      name: 'Data Team',
      email: 'sales@leadlists.co',
      message: 'We sell verified B2B leads and email database for contractors in Canada. Unsubscribe here.',
    },
  },
];

// ── Must PASS: genuine homeowner enquiries ─────────────────────────────────
const CUSTOMERS = [
  {
    label: 'plain interior job',
    sub: {
      name: 'Margaret Chen',
      email: 'm.chen@gmail.com',
      message:
        'Hi, I would like a quote to paint my living room and hallway in Westdale. Walls and ceiling, about 400 square feet. When are you available?',
    },
  },
  {
    // The critical false-positive guard: "Seo" is a common Korean surname. The
    // classifier must never scan the name field.
    label: 'customer surnamed Seo',
    sub: {
      name: 'Min-jun Seo',
      email: 'minjun.seo@outlook.com',
      message:
        'Looking for a quote to repaint the exterior trim and front door of our semi in Stoney Creek. Thanks!',
    },
  },
  {
    label: 'customer named Seo with a short message',
    sub: {
      name: 'Seo',
      email: 'seo.family@gmail.com',
      message: 'Need two bedrooms painted please. Ancaster.',
    },
  },
  {
    label: 'says "no obligation" innocently',
    sub: {
      name: 'Tom Alvarez',
      email: 'tomalv@yahoo.ca',
      message:
        'I understand the estimate is free with no obligation — is that right? I need my kitchen cabinets refinished in Dundas.',
    },
  },
  {
    label: 'landlord wanting more rental income (business-ish but real)',
    sub: {
      name: 'Rita Osei',
      email: 'rita.osei@gmail.com',
      message:
        'I want to repaint a rental unit between tenants to grow your business — sorry, I mean to get it rented faster. Move-out painting for a 2 bedroom apartment on the Mountain.',
    },
  },
  {
    label: 'customer pastes a Pinterest colour link',
    sub: {
      name: 'Chloe Bennett',
      email: 'chloeb@gmail.com',
      message:
        'This is the colour I want for my accent wall: https://pinterest.com/pin/12345 — can you colour match it? Room is in Waterdown.',
    },
  },
  {
    label: 'commercial-ish but a genuine painting job',
    sub: {
      name: 'Dave Kowalczyk',
      email: 'dave@kowalczykdental.ca',
      message:
        'We need our office reception area and hallway repainted over a weekend. Approximately 900 sq ft, Burlington.',
    },
  },
  {
    label: 'mentions a website but is a customer',
    sub: {
      name: 'Aisha Rahman',
      email: 'aisha.r@gmail.com',
      message:
        'I found the colour on your website gallery. Can you do the same finish on my stairs and railings in Binbrook?',
    },
  },
  {
    label: 'terse enquiry',
    sub: { name: 'J. Peters', email: 'jp@gmail.com', message: 'Deck staining quote? Grimsby.' },
  },
  {
    label: 'formal customer opening with Dear Sir/Madam',
    sub: {
      name: 'Harold Wentworth',
      email: 'h.wentworth@bell.net',
      message:
        'Dear Sir/Madam, I would be grateful for an estimate to repaint the interior of my bungalow in Ancaster. Three bedrooms and a hallway. Yours faithfully, Harold.',
    },
  },
  {
    label: 'customer offering a WhatsApp number',
    sub: {
      name: 'Fatima Ahmed',
      email: 'fatima.a@gmail.com',
      message:
        'Easiest to reach me on WhatsApp: 289-555-0142. I need my kitchen cabinets painted and some drywall cracks filled in Stoney Creek.',
    },
  },
  {
    label: 'customer mentions their own website',
    sub: {
      name: 'Greg Lam',
      email: 'greg@lamdental.ca',
      message:
        'I run a small clinic and need the waiting room repainted. Our website is lamdental.ca if you want to see the space. Burlington.',
    },
  },
  {
    label: 'seasonal word containing "seo"-like substrings',
    sub: {
      name: 'Karen Seong',
      email: 'kseong@gmail.com',
      message:
        'What is the best season to paint the exterior? Our stucco is peeling on the south side in Ancaster.',
    },
  },
];

test('drops real B2B solicitations', () => {
  for (const { label, sub } of SOLICITATIONS) {
    const v = classify(sub);
    assert.equal(v.spam, true, `expected DROP but passed: ${label}`);
  }
});

test('never drops a genuine homeowner enquiry', () => {
  for (const { label, sub } of CUSTOMERS) {
    const v = classify(sub);
    assert.equal(v.spam, false, `false positive on: ${label} (reason: ${v.reason})`);
  }
});

test('empty message is not classified as spam', () => {
  assert.equal(classify({ name: 'Test', message: '' }).spam, false);
});
