import Link from 'next/link';
import styles from './Home.module.css';
import Newsletter from './components/Newsletter';
import { adminFirestore } from "@/lib/firebase/server";

async function getRecentPosts() {
  const postsRef = adminFirestore.collection('blogs').orderBy('date', 'desc').limit(10);
  const querySnapshot = await postsRef.get();

  if (querySnapshot.empty) {
    return [];
  }

  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

export default async function Home() {
  const recentPosts = await getRecentPosts();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.highlight}>Bookworms of HSTU</span>
        </h1>
        <p className={styles.subtitle}>Your literary journey starts here.</p>
        <a href="https://forms.gle/nrLYgj6xuGvMQ7CK7" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>Join Us</a>
      </div>

      <div className={styles.recentPostsContainer}>
        <h2 className={styles.recentPostsTitle}>Recent Posts</h2>
        <div className={styles.postsGrid}>
          {recentPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className={styles.postCard}>
              <h3>{post.title}</h3>
              <p>{post.date}</p>
            </Link>
          ))}
        </div>
      </div>

      <Newsletter />
    </>
  );
}
