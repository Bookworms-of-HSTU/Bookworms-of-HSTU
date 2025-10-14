import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Welcome to the Bookworms of HSTU</h1>
        <p className={styles.subtitle}>Your literary journey starts here.</p>
        <a href="/blog" className={styles.ctaButton}>Explore Our Blog</a>
      </div>
    </div>
  );
}
