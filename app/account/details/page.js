import DetailsPage from '../../../site/pages/account/DetailsPage';
import AccountShell from '../../../site/components/account/AccountShell';
import { pageMeta } from '../../../lib/meta';

/* /account/details/ - same page as the live site */
export const metadata = pageMeta('/account/details/');

export default function Page() {
  return (
    <AccountShell>
      <DetailsPage />
    </AccountShell>
  );
}
