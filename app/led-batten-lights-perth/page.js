import BattenLightsPage from '../../site/pages/categories/BattenLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-batten-lights-perth/ - same page as the live site, see site/pages/categories/BattenLightsPage.jsx */
export const metadata = pageMeta('/led-batten-lights-perth/');

export default function Page() {
  return (
    <>
      <BattenLightsPage />
    </>
  );
}
