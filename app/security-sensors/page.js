import SecuritySensorsPage from '../../site/pages/categories/SecuritySensorsPage';
import { pageMeta } from '../../lib/meta';

/* /security-sensors/ - same page as the live site, see site/pages/categories/SecuritySensorsPage.jsx */
export const metadata = pageMeta('/security-sensors/');

export default function Page() {
  return (
    <>
      <SecuritySensorsPage />
    </>
  );
}
