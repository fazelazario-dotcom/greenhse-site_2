import CustomerServicePage from '../../site/pages/CustomerServicePage';
import { pageMeta } from '../../lib/meta';

/* /customer-service/ - same page as the live site, see site/pages/CustomerServicePage.jsx */
export const metadata = pageMeta('/customer-service/');

export default function Page() {
  return (
    <>
      <CustomerServicePage />
    </>
  );
}
