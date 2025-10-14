import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Bookworms of HSTU
        </Link>
        <div className={styles.navLinks}>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/magazine">Magazine</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/library">Library</Link>
          <Link href="/notices">Notice and News</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
