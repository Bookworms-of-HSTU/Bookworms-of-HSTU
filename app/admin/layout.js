'use client';

import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  const handleLogout = () => {
    // Implement logout functionality here
    console.log('Logged out');
  };

  return (
    <div className={styles.container}>
      <nav className={styles.sidebar}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/admin" className={styles.navLink}>
              Dashboard
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/committee" className={styles.navLink}>
              Committee
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/blogs" className={styles.navLink}>
              Blogs
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/magazines" className={styles.navLink}>
              Magazines
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/gallery" className={styles.navLink}>
              Gallery
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/library" className={styles.navLink}>
              Library
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/admin/notices" className={styles.navLink}>
              Notice and News
            </Link>
          </li>
        </ul>
        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
      </nav>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
}
