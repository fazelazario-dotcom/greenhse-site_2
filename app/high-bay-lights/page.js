import HighBayLightsPage from '../../site/pages/categories/HighBayLightsPage';
import { pageMeta } from '../../lib/meta';

/* /high-bay-lights/ - same page as the live site, see site/pages/categories/HighBayLightsPage.jsx */
export const metadata = pageMeta('/high-bay-lights/');

export default function Page() {
  return (
    <>
      <HighBayLightsPage />
    </>
  );
}
