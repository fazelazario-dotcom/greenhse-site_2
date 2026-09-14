import ProductsPage from '../../site/pages/ProductsPage';
import { pageMeta } from '../../lib/meta';

/* /products/ - same page as the live site, see site/pages/ProductsPage.jsx */
export const metadata = pageMeta('/products/');

export default function Page() {
  return (
    <>
      <ProductsPage />
    </>
  );
}
