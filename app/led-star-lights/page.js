import StarLightsPage from '../../site/pages/categories/StarLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-star-lights/ - same page as the live site, see site/pages/categories/StarLightsPage.jsx */
export const metadata = pageMeta('/led-star-lights/');

export default function Page() {
  return (
    <>
      <StarLightsPage />
    </>
  );
}
