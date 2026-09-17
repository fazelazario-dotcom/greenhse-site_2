import StripLightsPage from '../../site/pages/categories/StripLightsPage';
import { pageMeta } from '../../lib/meta';

/* /strip-lights/ - same page as the live site, see site/pages/categories/StripLightsPage.jsx */
export const metadata = pageMeta('/strip-lights/');

export default function Page() {
  return (
    <>
      <StripLightsPage />
    </>
  );
}
