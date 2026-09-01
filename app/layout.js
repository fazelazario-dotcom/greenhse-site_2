import { Poppins, JetBrains_Mono } from 'next/font/google';
import './_styles/site.css';
import './_styles/port.css';

const poppins = Poppins({ subsets:['latin'], weight:['400','500','600','700'], variable:'--font-poppins', display:'swap' });
const mono = JetBrains_Mono({ subsets:['latin'], weight:['400','500','700'], variable:'--font-jbmono', display:'swap' });

export const metadata = {
  metadataBase: new URL('https://greenhse.com'),
  title: 'Greenhse Technologies — Trusted LED Lighting & Smart Home, Perth',
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-AU" className={`${poppins.variable} ${mono.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
