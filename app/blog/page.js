import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { posts } from '../../data/posts';

export default function Blog() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Blog</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
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
