/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page on this site is fully static content; the only runtime data
  // (price, stock, cart) is fetched client-side from Magento, exactly as the
  // static build did. So the whole site exports as static HTML and Netlify
  // serves it from the CDN - no server functions needed.
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};
module.exports = nextConfig;
