import CommercialLightingPage from '../../site/pages/categories/CommercialLightingPage';
import { pageMeta } from '../../lib/meta';

/* /commercial-lighting-perth/ - same page as the live site, see site/pages/categories/CommercialLightingPage.jsx */
export const metadata = pageMeta('/commercial-lighting-perth/');

export default function Page() {
  return (
    <>
      <CommercialLightingPage />
    </>
  );
}
