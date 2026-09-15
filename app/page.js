import HomePage from '../site/pages/HomePage';
import NewsTicker from '../site/components/home/NewsTicker';
import { pageMeta } from '../lib/meta';

/* / - same page as the live site, see site/pages/HomePage.jsx
   The ticker is mounted here rather than inside HomePage on purpose: HomePage is
   decompiled from Jatin's bundle and gets regenerated, this file does not. */
export const metadata = pageMeta('/');

export default function Page() {
  return (
    <>
      <HomePage />
      <NewsTicker />
    </>
  );
}
