/** @type {import('next').NextConfig} */

/* The Magento backend is reached through three proxy paths — /mag/* (GraphQL:
   live prices, stock, login, cart, checkout), /docs/* (spec sheet PDFs) and
   /brand/* (client logos). In production Netlify provides these proxies via
   public/_redirects. The rewrites below provide the SAME proxies for
   `npm run dev`, so the site is backend-connected when run locally too.
   (For the built static site, `npm run preview` serves out/ with the same
   proxies — see scripts/serve.js.) */
const MAGENTO_PROXIES = [
  { source: '/mag/:path*',   destination: 'https://greenhse.com/:path*' },
  { source: '/docs/:path*',  destination: 'https://greenhse.com/media/sparsh/product_attachment/:path*' },
  { source: '/brand/:path*', destination: 'https://greenhse.com/media/wysiwyg/:path*' },
];

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  // Every page on this site is fully static content; the only runtime data
  // (price, stock, cart) is fetched client-side from Magento, exactly as the
  // static build did. So the whole site exports as static HTML and Netlify
  // serves it from the CDN - no server functions needed.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // rewrites are a dev-server feature; the exported build gets the same
  // proxies from public/_redirects (Netlify) or scripts/serve.js (local).
  ...(isDev ? { rewrites: async () => MAGENTO_PROXIES } : {}),
};
module.exports = nextConfig;
