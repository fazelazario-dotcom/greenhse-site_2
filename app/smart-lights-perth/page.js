import SmartLightsPage from '../../site/pages/categories/SmartLightsPage';
import { pageMeta } from '../../lib/meta';

/* /smart-lights-perth/ - same page as the live site, see site/pages/categories/SmartLightsPage.jsx */
export const metadata = pageMeta('/smart-lights-perth/');

export default function Page() {
  return (
    <>
      <SmartLightsPage />
    </>
  );
}
