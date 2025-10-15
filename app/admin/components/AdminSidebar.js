'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../layout.module.css';

const AdminSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', name: 'Dashboard' },
    { href: '/admin/blogs', name: 'Blogs' },
    { href: '/admin/committee', name: 'Committee' },
    { href: '/admin/gallery', name: 'Gallery' },
    { href: '/admin/library', name: 'Library' },
    { href: '/admin/magazines', name: 'Magazines' },
    { href: '/admin/messages', name: 'Messages' },
    { href: '/admin/notices', name: 'Notices' },
  ];

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className={pathname === item.href ? styles.active : ''}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
