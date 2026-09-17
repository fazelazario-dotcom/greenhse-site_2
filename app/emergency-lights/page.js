import EmergencyLightsPage from '../../site/pages/categories/EmergencyLightsPage';
import { pageMeta } from '../../lib/meta';

/* /emergency-lights/ - same page as the live site, see site/pages/categories/EmergencyLightsPage.jsx */
export const metadata = pageMeta('/emergency-lights/');

export default function Page() {
  return (
    <>
      <EmergencyLightsPage />
    </>
  );
}
