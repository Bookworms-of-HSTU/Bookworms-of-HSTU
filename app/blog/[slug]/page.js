import { posts } from '../../../data/posts';
import styles from './page.module.css';

export default function Post({ params }) {
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className={styles.container}>
      <img src={post.image} alt={post.title} className={styles.image} />
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.date}>{post.date}</div>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
