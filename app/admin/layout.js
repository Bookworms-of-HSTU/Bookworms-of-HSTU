'use client';

import styles from './layout.module.css';

export default function AdminLayout({ children }) {
  return (
    <div className={styles.container}>
        <main className={styles.main}>
            {children}
        </main>
    </div>
  );
}
