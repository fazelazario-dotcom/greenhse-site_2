import GardenPoolLightsPage from '../../site/pages/categories/GardenPoolLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-garden-pool-lights-perth/ - same page as the live site, see site/pages/categories/GardenPoolLightsPage.jsx */
export const metadata = pageMeta('/led-garden-pool-lights-perth/');

export default function Page() {
  return (
    <>
      <GardenPoolLightsPage />
    </>
  );
}
