import FloodLightsPage from '../../site/pages/categories/FloodLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-flood-lights-perth/ - same page as the live site, see site/pages/categories/FloodLightsPage.jsx */
export const metadata = pageMeta('/led-flood-lights-perth/');

export default function Page() {
  return (
    <>
      <FloodLightsPage />
    </>
  );
}
