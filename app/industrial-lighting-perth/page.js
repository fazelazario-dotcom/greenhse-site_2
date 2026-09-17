import IndustrialLightingPage from '../../site/pages/categories/IndustrialLightingPage';
import { pageMeta } from '../../lib/meta';

/* /industrial-lighting-perth/ - same page as the live site, see site/pages/categories/IndustrialLightingPage.jsx */
export const metadata = pageMeta('/industrial-lighting-perth/');

export default function Page() {
  return (
    <>
      <IndustrialLightingPage />
    </>
  );
}
