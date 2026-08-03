/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Every canonical on this site ends in a slash, so the router must agree or
  // Google sees two URLs for one page.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    // All photography is self-hosted under /public/images, so no remote
    // patterns are needed. Keeping this empty is deliberate.
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
