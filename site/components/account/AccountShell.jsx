import AccountGuard from './AccountGuard';
import AccountNav from './AccountNav';

/* The signed-in account pages: heading, section nav, panel. Same markup as the live site. */
export default function AccountShell({ children }) {
  return (
    <main className="acc">
      <div className="container">
        <div className="acc__head">
          <span className="acc__eyebrow">Account</span>
          <h1 className="acc__title">My account</h1>
        </div>
        <div className="acc__layout">
          <AccountGuard />
          <AccountNav />
          <div className="acc__content">{children}</div>
        </div>
      </div>
    </main>
  );
}
