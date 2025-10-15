'use client';

import { useRouter } from 'next/navigation';
import styles from '../layout.module.css';

const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const res = await fetch('/api/logout', {
      method: 'POST',
    });
    if (res.ok) {
      router.push('/admin/login');
    }
  };

  return (
    <header className={styles.header}>
      <h1>Admin Panel</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
    </header>
  );
};

export default AdminHeader;
