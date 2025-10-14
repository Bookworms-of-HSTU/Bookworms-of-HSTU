import Image from 'next/image';
import { posts } from '../../../data/posts';
import styles from './page.module.css';

export default function Post({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.container}>
      <Image src={post.image} alt={post.title} className={styles.image} width={800} height={400} />
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{post.date}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
