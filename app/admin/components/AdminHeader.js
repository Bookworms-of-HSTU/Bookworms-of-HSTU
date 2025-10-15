
'use client';

import { useRouter } from 'next/navigation';
import styles from '../layout.module.css';
import { useEffect, useState } from 'react';

const AdminHeader = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {mounted && <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>}
    </header>
  );
};

export default AdminHeader;
