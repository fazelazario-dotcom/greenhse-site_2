import RegisterPage from '../../../site/pages/account/RegisterPage';
import AuthShell from '../../../site/components/account/AuthShell';
import { pageMeta } from '../../../lib/meta';

/* /account/create/ - same page as the live site */
export const metadata = pageMeta('/account/create/');

export default function Page() {
  return (
    <AuthShell>
      <RegisterPage />
    </AuthShell>
  );
}
