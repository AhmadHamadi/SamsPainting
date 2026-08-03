import { photos, type PhotoKey } from '@/lib/photos';

type Props = {
  name: PhotoKey;
  /** Overrides the catalogue alt text when a page needs more specific wording. */
  alt?: string;
  className?: string;
  sizes?: string;
  /** True only for the LCP image on a page — preloads and skips lazy-loading. */
  priority?: boolean;
};

/**
 * Renders a self-hosted photo from the verified catalogue in lib/photos.ts.
 *
 * Every entry in that catalogue was opened and visually checked before being
 * assigned to a page, and carries its real intrinsic pixel dimensions — so
 * width/height here are always correct and the layout never shifts.
 */
export default function Img({ name, alt, className = '', sizes, priority = false }: Props) {
  const photo = photos[name];
  return (
    <img
      src={photo.src}
      alt={alt ?? photo.alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      className={className}
    />
  );
}
