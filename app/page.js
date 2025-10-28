import styles from './Home.module.css';
import Newsletter from './components/Newsletter';

export const metadata = {
  title: 'Bookworms of HSTU - A Literary Community',
  description: 'Welcome to the official website of the Bookworms of HSTU, a vibrant community for literary enthusiasts at Hajee Mohammad Danesh Science and Technology University.',
  keywords: 'Bookworms of HSTU, HSTU, literary club, book club, reading, writing, poetry, literature',
};

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.highlight}>Bookworms of HSTU</span>
        </h1>
        <p className={styles.subtitle}>Your literary journey starts here.</p>
        <a 
          href="https://forms.gle/nrLYgj6xuGvMQ7CK7" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${styles.ctaButton} ga-trackable`}
          data-ga-category="Homepage"
          data-ga-action="Click"
          data-ga-label="Join Us Button"
        >
          Join Us
        </a>
      </div>
      <Newsletter />
    </>
  );
}
