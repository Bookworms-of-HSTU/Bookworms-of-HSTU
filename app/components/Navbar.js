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
          <Link href="/" className={styles.logo} data-analytics-id="navbar-logo-click" prefetch={false}>
            <Image src="/logo.png" alt="Bookworms of HSTU Logo" width={40} height={40} />
            <span>Bookworms of HSTU</span>
          </Link>
        </div>

        <NavbarInteractive 
          navLinks={
            <div className={styles.navLinks}>
              <Link href="/about" data-analytics-id="navbar-link-about" prefetch={false}>About</Link>
              <Link href="/library" data-analytics-id="navbar-link-library" prefetch={false}>Library</Link>
              <Link href="/blog" data-analytics-id="navbar-link-blog" prefetch={false}>Blog</Link>
              <Link href="/gallery" data-analytics-id="navbar-link-gallery" prefetch={false}>Gallery</Link>
              <Link href="/magazine" data-analytics-id="navbar-link-magazine" prefetch={false}>Magazine</Link>
              <Link href="/notices" data-analytics-id="navbar-link-notices" prefetch={false}>Notices</Link>
              <Link href="/contact" data-analytics-id="navbar-link-contact" prefetch={false}>Contact</Link>
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
