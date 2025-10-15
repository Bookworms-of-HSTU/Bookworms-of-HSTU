import styles from './page.module.css';

export default function Admin() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Panel</h1>
      <p>Welcome to the admin panel. Please use the sidebar to navigate to the different sections.</p>
    </div>
  );
}
