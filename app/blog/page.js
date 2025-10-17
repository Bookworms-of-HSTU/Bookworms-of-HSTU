import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

async function getPosts() {
  const postsCollection = collection(db, "blogs");
  const postsSnapshot = await getDocs(postsCollection);
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
