import styles from './Home.module.css';
import Newsletter from './components/Newsletter';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.highlight}>Bookworms of HSTU</span>
        </h1>
        <p className={styles.subtitle}>Your literary journey starts here.</p>
        <a href="#" className={styles.ctaButton}>Join Us</a>
      </div>
      <Newsletter />
    </>
  );
}
