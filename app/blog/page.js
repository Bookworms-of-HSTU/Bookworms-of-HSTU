import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
// Switch to the server-side admin SDK
import { adminFirestore } from "@/lib/firebase/server";

// This line ensures the page is never cached and always fetches fresh data.
export const dynamic = 'force-dynamic';

async function getPosts() {
  // Use the correct adminFirestore to get data
  const postsCollection = adminFirestore.collection("blogs");
  const postsSnapshot = await postsCollection.get();
  const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return posts;
}

export default async function Blog() {
  const posts = await getPosts();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Blog</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          // The link is correct, using post.slug
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.card}>
            <Image src={post.image} alt={post.title} className={styles.cardImage} width={400} height={200} />
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardExcerpt}>{post.excerpt}</p>
              <span className={styles.cardDate}>{post.date}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
