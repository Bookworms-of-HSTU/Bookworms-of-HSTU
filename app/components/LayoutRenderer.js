'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function LayoutRenderer({ children }) {
  const pathname = usePathname();
  const isAdminPage = pathname && pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navbar />}
      <main>{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
}
