import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/**
 * Search and AI crawlers are allowed explicitly rather than relying on a
 * wildcard, because several AI agents only honour a rule that names them.
 * /api/ is disallowed everywhere — there is nothing there worth indexing and
 * the quote endpoint should not be crawled.
 */
const ALLOWED = [
  // Search
  'Googlebot',
  'Googlebot-Image',
  'Bingbot',
  'DuckDuckBot',
  'Slurp',
  'Applebot',
  // AI / answer engines
  'Google-Extended',
  'Applebot-Extended',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'CCBot',
  'Amazonbot',
  'Meta-ExternalAgent',
  'MistralAI-User',
  'YouBot',
  'Bytespider',
  'Diffbot',
  'cohere-ai',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ALLOWED.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: [`${site.url}/sitemap.xml`, `${site.url}/image-sitemap.xml`],
    host: site.url,
  };
}
