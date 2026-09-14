import CartPage from '../../site/pages/CartPage';
import { pageMeta } from '../../lib/meta';

/* /cart/ - same page as the live site, see site/pages/CartPage.jsx */
export const metadata = pageMeta('/cart/');

export default function Page() {
  return (
    <>
      <CartPage />
    </>
  );
}
