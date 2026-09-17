import PrivacyPage from '../../site/pages/PrivacyPage';
import { pageMeta } from '../../lib/meta';

/* /privacy-policy-cookie-restriction-mode/ - same page as the live site, see site/pages/PrivacyPage.jsx */
export const metadata = pageMeta('/privacy-policy-cookie-restriction-mode/');

export default function Page() {
  return (
    <>
      <PrivacyPage />
    </>
  );
}
