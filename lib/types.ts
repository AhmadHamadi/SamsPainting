/** Shared content types. Kept separate so client components can import the
 *  type without pulling in the whole content layer. */

export type FaqItem = { q: string; a: string };

export type Crumb = { name: string; href: string };
