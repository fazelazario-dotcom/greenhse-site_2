import OrdersPage from '../../../site/pages/account/OrdersPage';
import AccountShell from '../../../site/components/account/AccountShell';
import { pageMeta } from '../../../lib/meta';

/* /account/orders/ - same page as the live site */
export const metadata = pageMeta('/account/orders/');

export default function Page() {
  return (
    <AccountShell>
      <OrdersPage />
    </AccountShell>
  );
}
