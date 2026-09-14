import meta from '../data/jatin-meta.json';

/* Page metadata, page by page, as captured from the live site. og:url and
   the image URLs are rebased onto this site via metadataBase in app/layout.js. */
const HOST = 'https://demolights.greenhse.com';
const rel = (u) => (u && u.startsWith(HOST) ? u.slice(HOST.length) : u);

export function pageMeta(path, extra) {
  const m = meta[path] || {};
  const out = {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: m['og:title'] || m.title,
      description: m['og:description'] || m.description,
      url: path,
      siteName: m['og:site_name'] || 'Greenhse Technologies',
      type: m['og:type'] === 'product' ? 'website' : (m['og:type'] || 'website'),
      images: m['og:image'] ? [{ url: rel(m['og:image']), width: m['og:image:width'] ? +m['og:image:width'] : undefined, height: m['og:image:height'] ? +m['og:image:height'] : undefined, alt: m['og:image:alt'] }] : undefined,
    },
    twitter: {
      card: m['twitter:card'] || 'summary_large_image',
      title: m['twitter:title'] || m.title,
      description: m['twitter:description'] || m.description,
      images: m['twitter:image'] ? [rel(m['twitter:image'])] : undefined,
    },
    ...(extra || {}),
  };
  return out;
}
export function pageLd(path) { return (meta[path] || {}).ld || null; }
