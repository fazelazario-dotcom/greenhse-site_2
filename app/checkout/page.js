import CheckoutPage from '../../site/pages/CheckoutPage';
import { pageMeta } from '../../lib/meta';

/* /checkout/ - same page as the live site, see site/pages/CheckoutPage.jsx */
export const metadata = pageMeta('/checkout/');

export default function Page() {
  return (
    <>
      <CheckoutPage />
    </>
  );
}
