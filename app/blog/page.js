import Link from 'next/link';
import styles from './page.module.css';
import { posts } from '../../data/posts';

export default function Blog() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Blog</h1>
      <div className={styles.grid}>
        {posts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
            <img src={post.image} alt={post.title} className={styles.cardImage} />
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
