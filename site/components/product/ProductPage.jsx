'use client';
import JSXStyle from 'styled-jsx/style';
import Link from 'next/link';
import * as navigation from 'next/navigation';
import ProductDetail from './ProductDetail';
import * as nav from '../../lib/nav';
export default function Default({ product: e }) {
  let o = navigation.useRouter();
  return e ? (
    <main className="jsx-1d9c56d6e0d28835 detail">
      <div className="jsx-1d9c56d6e0d28835 container">
        <nav aria-label="Breadcrumb" className="jsx-1d9c56d6e0d28835 crumbs">
          <Link href="/#categories">Categories</Link>
          <span aria-hidden="true" className="jsx-1d9c56d6e0d28835">
            /
          </span>
          <Link href={nav.categoryHref(e.category)}>{e.category}</Link>
          <span aria-hidden="true" className="jsx-1d9c56d6e0d28835">
            /
          </span>
          <span className="jsx-1d9c56d6e0d28835 crumbs__here">{e.name}</span>
        </nav>
        <ProductDetail
          product={e}
          onNavigate={(e) => {
            o.push(`/product/${e.slug}`);
          }}
        />
      </div>
      <JSXStyle id="1d9c56d6e0d28835">
        {
          '.detail.jsx-1d9c56d6e0d28835{padding:28px 0 88px}.crumbs.jsx-1d9c56d6e0d28835{font-family:var(--font-mono);letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);align-items:center;gap:8px;margin-bottom:28px;font-size:11px;display:flex}.crumbs.jsx-1d9c56d6e0d28835 a:hover{color:var(--green)}.crumbs__here.jsx-1d9c56d6e0d28835{color:var(--ink)}'
        }
      </JSXStyle>
    </main>
  ) : (
    <main className="detail">
      <div className="container">
        <p>Product not found.</p>
        <Link href="/#striplights">Back to strip lights</Link>
      </div>
    </main>
  );
}
