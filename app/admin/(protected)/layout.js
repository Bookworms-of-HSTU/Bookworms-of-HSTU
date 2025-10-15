'use client';

import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import styles from './layout.module.css';

export default function ProtectedAdminLayout({ children }) {
  return (
    <div className={styles.container}>
      <AdminHeader />
      <div className={styles.contentArea}>
        <AdminSidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
}
