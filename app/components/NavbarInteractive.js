'use client';

import { useState } from 'react';
import styles from './Navbar.module.css';
import MobileMenu from './MobileMenu';

export default function NavbarInteractive({ navLinks, searchBar }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div className={styles.desktopNav}>
        {navLinks}
      </div>
      <div className={styles.desktopSearch}>
        {searchBar}
      </div>
      <button className={styles.hamburger} onClick={toggleMobileMenu} aria-label="Open navigation menu">
        &#9776;
      </button>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu}>
        {navLinks}
        {searchBar}
      </MobileMenu>
    </>
  );
}
