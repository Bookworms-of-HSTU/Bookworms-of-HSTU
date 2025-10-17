import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import Search from './Search/Search';
import NavbarInteractive from './NavbarInteractive';

export default function Navbar() {
  return (
    <nav className={styles.navbar} data-analytics-section="navbar">
      <div className={styles.container}>
        <div className={styles.logoAndNav}>
          <Link href="/" className={styles.logo} data-analytics-id="navbar-logo-click">
            <Image src="/logo.png" alt="Bookworms of HSTU Logo" width={40} height={40} />
            <span>Bookworms of HSTU</span>
          </Link>
        </div>

        <NavbarInteractive 
          navLinks={
            <div className={styles.navLinks}>
              <Link href="/about" data-analytics-id="navbar-link-about">About</Link>
              <Link href="/library" data-analytics-id="navbar-link-library">Library</Link>
              <Link href="/blog" data-analytics-id="navbar-link-blog">Blog</Link>
              <Link href="/gallery" data-analytics-id="navbar-link-gallery">Gallery</Link>
              <Link href="/magazine" data-analytics-id="navbar-link-magazine">Magazine</Link>
              <Link href="/notices" data-analytics-id="navbar-link-notices">Notices</Link>
              <Link href="/contact" data-analytics-id="navbar-link-contact">Contact</Link>
            </div>
          }
          searchBar={
            <div className={styles.searchWrapper}>
              <Search />
            </div>
          }
        />
      </div>
    </nav>
  );
}
