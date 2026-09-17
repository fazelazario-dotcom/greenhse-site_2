import ContactPage from '../../site/pages/ContactPage';
import { pageMeta } from '../../lib/meta';

/* /contact/ - same page as the live site, see site/pages/ContactPage.jsx */
export const metadata = pageMeta('/contact/');

export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
