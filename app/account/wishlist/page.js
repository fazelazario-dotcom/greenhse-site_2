import WishlistPage from '../../../site/pages/account/WishlistPage';
import AccountShell from '../../../site/components/account/AccountShell';
import { pageMeta } from '../../../lib/meta';

/* /account/wishlist/ - same page as the live site */
export const metadata = pageMeta('/account/wishlist/');

export default function Page() {
  return (
    <AccountShell>
      <WishlistPage />
    </AccountShell>
  );
}
