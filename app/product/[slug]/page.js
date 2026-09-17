import { notFound } from 'next/navigation';
import catalog from '../../../data/catalog.json';
import extra from '../../../data/catalog-extra.json';
import { normalizeProduct, getAttr, stripHtml } from '../../../site/lib/api';
import ProductPage from '../../../site/components/product/ProductPage';

/* /product/<slug>/ - one page per product, built from the catalogue snapshot
   (data/catalog.json, refreshed by scripts/fetch-catalog.js at every build).
   The feeds are searched in the same order as the live site, so a product
   that sits in several categories gets the same category label here. */

const FEED_ORDER = ['11', '5', '17', '52', '19', '23', '9', '67', '7', '14', '34', '58', '21', '12', '55', '18', '66', '72', '3', '16', '25', '74'];
const feeds = () => FEED_ORDER.filter((id) => catalog.feeds[id]).map((id) => catalog.feeds[id]);
const slugOf = (p) => getAttr(p, 'url_key') || p.sku;

function findProduct(slug) {
  for (const f of feeds()) {
    const raw = f.items.find((p) => slugOf(p) === slug);
    if (raw) return normalizeProduct(raw, f.categoryLabel);
  }
  /* products the category feeds do not carry (grouped-product children), as the live site shows them */
  return extra.find((p) => p.slug === slug) || null;
}

export function generateStaticParams() {
  const seen = new Set();
  for (const f of feeds()) for (const p of f.items) seen.add(slugOf(p));
  for (const p of extra) seen.add(p.slug);
  return [...seen].filter(Boolean).map((slug) => ({ slug }));
}
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const p = findProduct(params.slug);
  if (!p) return {};
  const attr = (k) => (p.customAttributes || []).find((a) => a.attribute_code === k)?.value;
  const title = attr('meta_title') || `${p.name} | Greenhse Technologies`;
  const description = attr('meta_description') || p.description || undefined;
  const path = `/product/${params.slug}/`;
  const images = p.images && p.images.length ? p.images : p.image ? [p.image] : [];
  return {
    title,
    description,
    keywords: attr('meta_keyword') || undefined,
    alternates: { canonical: path },
    openGraph: {
      title, description, url: path, siteName: 'Greenhse Technologies', type: 'website',
      images: images.length ? [{ url: images[0], width: 1913, height: 822, alt: 'Greenhse security lighting and motion sensors' }] : undefined,
    },
    twitter: { card: 'summary_large_image', title, description, images: images.length ? [images[images.length - 1]] : undefined },
  };
}

export default function Page({ params }) {
  const p = findProduct(params.slug);
  if (!p) notFound();
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    description: stripHtml((p.customAttributes || []).find((a) => a.attribute_code === 'description')?.value || p.description || ''),
    sku: p.sku,
    category: p.category,
    image: p.images,
    offers: {
      '@type': 'Offer',
      url: `https://greenhse.com/product/${params.slug}/`,
      priceCurrency: 'AUD',
      price: p.price,
      availability: p.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ProductPage product={p} />
    </>
  );
}
