import { notFound } from 'next/navigation';
import { SITE, cleanPath } from '../../../lib/site';
import BlogPost from '../../../components/BlogPost';

/* /blog/<slug>/ - this site's own posts, from data/site.json (kept as they
   were; lib/blog.js cleans them at render). */
const keyOf = (slug) => '/blog/' + slug + '.html';

export function generateStaticParams() {
  return Object.keys(SITE.blogs).map((k) => ({ slug: k.replace(/^\/blog\//, '').replace(/\.html$/, '') }));
}
export const dynamicParams = false;

export function generateMetadata({ params }) {
  const d = SITE.blogs[keyOf(params.slug)];
  if (!d) return {};
  return {
    title: d.title || d.name || d.h1,
    description: d.desc || undefined,
    alternates: { canonical: cleanPath(d.canonical ? d.canonical.replace('https://greenhse.com', '') : '/blog/' + params.slug + '/') },
  };
}

export default function Page({ params }) {
  const key = keyOf(params.slug);
  const d = SITE.blogs[key];
  if (!d) notFound();
  return <main className="bl-main home"><BlogPost b={d} path={key} /></main>;
}
