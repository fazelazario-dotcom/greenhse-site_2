import Script from 'next/script';
import './_styles/jatin.css';
import './_styles/blog.css';
import StyledJsxRegistry from '../site/components/providers/StyledJsxRegistry';
import StoreProvider from '../site/components/providers/StoreProvider';
import AuthBootstrap from '../site/components/providers/AuthBootstrap';
import ScrollManager from '../site/components/providers/ScrollManager';
import Header from '../site/components/layout/Header';
import Footer from '../site/components/layout/Footer';
import Overlays from '../site/components/layout/Overlays';
import SiteChrome from '../site/components/layout/SiteChrome';

export const metadata = {
  metadataBase: new URL('https://greenhse.com'),
  title: 'Greenhse Technologies — Trusted LED Lighting & Smart Home, Perth',
  description: 'Australian-certified LED strip lighting. Perth stock and support, fast WA delivery. Request a quote on any strip.',
  icons: { icon: [{ url: '/favicon.png?v=9ff6c5f', type: 'image/png' }], apple: [{ url: '/favicon.png?v=9ff6c5f', type: 'image/png' }] },
  openGraph: { siteName: 'Greenhse Technologies', type: 'website' },
};
export const viewport = { themeColor: '#f4f2ec' };

/* The whole site shares this shell: store + auth bootstrap, header, page,
   footer, and the overlays (quick view, enquiry, quote, cart drawer, toast,
   cookie notice). Same order as the live site. */
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="poppins_e2107f16-module__fO-fHG__variable jetbrains_mono_6971e19a-module__pjXg2W__variable">
      <body>
        <StyledJsxRegistry>
          <StoreProvider>
            <AuthBootstrap />
            <ScrollManager />
            {/* The layout planner owns the whole window, so the site's header,
                footer and overlays step aside on that route (SiteChrome). */}
            <SiteChrome>
              <Header />
            </SiteChrome>
            {children}
            <SiteChrome>
              <Footer />
              <Overlays />
            </SiteChrome>
          </StoreProvider>
        </StyledJsxRegistry>
        <Script id="tawk-to" strategy="lazyOnload">{`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/69674122a64fd41980797337/1jetlcrtq';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}</Script>
      </body>
    </html>
  );
}
