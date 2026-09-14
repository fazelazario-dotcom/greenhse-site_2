import AirFlowPage from '../../site/pages/categories/AirFlowPage';
import { pageMeta } from '../../lib/meta';

/* /air-flow/ - same page as the live site, see site/pages/categories/AirFlowPage.jsx */
export const metadata = pageMeta('/air-flow/');

export default function Page() {
  return (
    <>
      <AirFlowPage />
    </>
  );
}
