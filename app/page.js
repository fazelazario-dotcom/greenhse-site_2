import HomePage from '../site/pages/HomePage';
import { pageMeta } from '../lib/meta';

/* / - same page as the live site, see site/pages/HomePage.jsx */
export const metadata = pageMeta('/');

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
