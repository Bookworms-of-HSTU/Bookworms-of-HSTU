'use client';

import styles from './MobileMenu.module.css';

export default function MobileMenu({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        {children}
      </div>
    </div>
  );
}
