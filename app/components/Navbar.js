import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Search from './Search/Search';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Group 1: Logo and Navigation Links */}
        <div className={styles.logoAndNav}>
          <Link href="/" className={styles.logo}>
            <Image src="/logo.png" alt="Bookworms of HSTU Logo" width={40} height={40} />
            <span>Bookworms of HSTU</span>
          </Link>
          
          <div className={styles.navLinks}>
            <Link href="/about">About</Link>
            <Link href="/library">Library</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/magazine">Magazine</Link>
            <Link href="/notices">Notices</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>

        {/* Group 2: Search Bar */}
        <div className={styles.searchWrapper}>
          <Search />
        </div>

      </div>
    </nav>
  );
}
