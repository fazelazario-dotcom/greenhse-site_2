import DownlightsPage from '../../site/pages/categories/DownlightsPage';
import { pageMeta } from '../../lib/meta';

/* /led-downlights-perth/ - same page as the live site, see site/pages/categories/DownlightsPage.jsx */
export const metadata = pageMeta('/led-downlights-perth/');

export default function Page() {
  return (
    <>
      <DownlightsPage />
    </>
  );
}
