import ForgotPasswordPage from '../../../site/pages/account/ForgotPasswordPage';
import AuthShell from '../../../site/components/account/AuthShell';
import { pageMeta } from '../../../lib/meta';

/* /account/forgotpassword/ - same page as the live site */
export const metadata = pageMeta('/account/forgotpassword/');

export default function Page() {
  return (
    <AuthShell>
      <ForgotPasswordPage />
    </AuthShell>
  );
}
