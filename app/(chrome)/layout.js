import Script from 'next/script';
import { Header, Footer } from '../../components/Chrome';

/* Every page except the homepage shares this chrome. The homepage ships its
   own header and footer because its shop, cart and finder wizards are wired
   into them - see app/page.js. */
export default function ChromeLayout({ children }) {
  return (<><Script src="/assets/img-fallback.js" strategy="beforeInteractive"/><Header/>{children}<Footer/></>);
}
