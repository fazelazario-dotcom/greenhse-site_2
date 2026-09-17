import TrackLightsPage from '../../site/pages/categories/TrackLightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-track-lights-perth/ - same page as the live site, see site/pages/categories/TrackLightsPage.jsx */
export const metadata = pageMeta('/led-track-lights-perth/');

export default function Page() {
  return (
    <>
      <TrackLightsPage />
    </>
  );
}
