import { Inter, Poppins, Playfair_Display } from 'next/font/google';
import Script from 'next/script';
import Analytics from './components/Analytics';
import { GA_TRACKING_ID } from './lib/gtag';
import './globals.css';
import { headers } from 'next/headers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['400', '500', '700'],
  variable: '--font-poppins' 
});
const playfairDisplay = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair-display' 
});

export const metadata = {
  title: {
    template: '%s | Bookworms of HSTU',
    default: 'Bookworms of HSTU - Official Website',
  },
  description: 'The official website for the Bookworms of HSTU, a student book club at Hajee Mohammad Danesh Science and Technology University. Explore our library, blog, events, and more.',
  keywords: ['Bookworms of HSTU', 'HSTU book club', 'reading club', 'student organization', 'Hajee Mohammad Danesh Science and Technology University', 'book club website'],
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({ children }) {
  const headersList = headers();
  const pathname = headersList.get('x-next-pathname') || '';
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en" className={`${poppins.variable} ${playfairDisplay.variable}`}>
      <head>
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}');
            `,
          }}
        />
      </head>
      <body>
        <Analytics />
        {!isAdminPage && <Navbar />}
        <main>{children}</main>
        {!isAdminPage && <Footer />}
      </body>
    </html>
  );
}
