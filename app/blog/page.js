
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { adminFirestore } from "@/lib/firebase/server";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Blog | Bookworms of HSTU',
  description: 'Explore articles, stories, and literary discussions from the members of the Bookworms of HSTU. Stay updated with our latest posts.',
  keywords: ['blog', 'Bookworms of HSTU blog', 'student writing', 'literary articles', 'book reviews'],
};

async function getPosts() {
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
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug} 
            className={`${styles.card} ga-trackable`}
            data-ga-action="click_blog_post"
            data-ga-category="Blog"
            data-ga-label={post.title}
          >
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
