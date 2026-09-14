import LoginPage from '../../../site/pages/account/LoginPage';
import AuthShell from '../../../site/components/account/AuthShell';
import SessionNotice from '../../../site/components/account/SessionNotice';
import { Suspense } from 'react';
import { pageMeta } from '../../../lib/meta';

/* /account/login/ - same page as the live site */
export const metadata = pageMeta('/account/login/');

export default function Page() {
  return (
    <AuthShell>
      <Suspense fallback={null}><SessionNotice /></Suspense>
      <LoginPage />
    </AuthShell>
  );
}
