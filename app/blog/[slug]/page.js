import Image from 'next/image';
// Use the Firebase Admin SDK for server-side data fetching
import { adminFirestore } from "@/lib/firebase/server";
import styles from './page.module.css';

async function getPost(slug) {
  // Use the Admin SDK syntax to query the collection
  const postsRef = adminFirestore.collection('blogs');
  const q = postsRef.where('slug', '==', slug);
  const querySnapshot = await q.get();

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() };
  } else {
    return null;
  }
}

export default async function Post({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <div style={{ position: 'relative', width: '100%', height: '50vh' }}>
        <Image 
          src={post.image} 
          alt={post.title} 
          className={styles.image} 
          fill 
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.date}>{post.date}</div>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </div>
  );
}
