import AddressesPage from '../../../site/pages/account/AddressesPage';
import AccountShell from '../../../site/components/account/AccountShell';
import { pageMeta } from '../../../lib/meta';

/* /account/addresses/ - same page as the live site */
export const metadata = pageMeta('/account/addresses/');

export default function Page() {
  return (
    <AccountShell>
      <AddressesPage />
    </AccountShell>
  );
}
