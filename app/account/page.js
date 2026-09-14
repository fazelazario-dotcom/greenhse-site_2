import OrdersPage from '../../site/pages/account/OrdersPage';
import AccountShell from '../../site/components/account/AccountShell';
import { pageMeta } from '../../lib/meta';

/* /account/ - same page as the live site */
export const metadata = pageMeta('/account/');

export default function Page() {
  return (
    <AccountShell>
      <OrdersPage />
    </AccountShell>
  );
}
