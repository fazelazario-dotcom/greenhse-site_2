import GuestOnly from './GuestOnly';

/* The sign-in / create / forgot-password pages: a card in the middle. A signed-in visitor is sent home. */
export default function AuthShell({ children }) {
  return (
    <main className="acc acc--auth">
      <div className="container">
        <GuestOnly />
        {children}
      </div>
    </main>
  );
}
