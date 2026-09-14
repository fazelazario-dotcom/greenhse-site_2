import CeilingLightsPage from '../../site/pages/categories/CeilingLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-ceiling-lights-perth/ - same page as the live site, see site/pages/categories/CeilingLightsPage.jsx */
export const metadata = pageMeta('/led-ceiling-lights-perth/');

export default function Page() {
  return (
    <>
      <CeilingLightsPage />
    </>
  );
}
