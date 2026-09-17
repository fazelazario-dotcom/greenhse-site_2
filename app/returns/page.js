import ReturnsPage from '../../site/pages/ReturnsPage';
import { pageMeta } from '../../lib/meta';

/* /returns/ - same page as the live site, see site/pages/ReturnsPage.jsx */
export const metadata = pageMeta('/returns/');

export default function Page() {
  return (
    <>
      <ReturnsPage />
    </>
  );
}
