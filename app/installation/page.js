import InstallationPage from '../../site/pages/InstallationPage';
import { pageMeta } from '../../lib/meta';

/* /installation/ - same page as the live site, see site/pages/InstallationPage.jsx */
export const metadata = pageMeta('/installation/');

export default function Page() {
  return (
    <>
      <InstallationPage />
    </>
  );
}
