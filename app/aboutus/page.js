import AboutPage from '../../site/pages/AboutPage';
import { pageMeta } from '../../lib/meta';

/* /aboutus/ - same page as the live site, see site/pages/AboutPage.jsx */
export const metadata = pageMeta('/aboutus/');

export default function Page() {
  return (
    <>
      <AboutPage />
    </>
  );
}
