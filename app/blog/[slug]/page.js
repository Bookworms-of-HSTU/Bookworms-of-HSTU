import Image from 'next/image';
import { adminFirestore } from "@/lib/firebase/server";
import styles from './page.module.css';

async function getPost(slug) {
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const postsRef = adminFirestore.collection('blogs');
  const querySnapshot = await postsRef.get();

  if (querySnapshot.empty) {
    return null;
  }

  // Find the post by comparing the lowercase slug, making the match case-insensitive.
  const postDoc = querySnapshot.docs.find(doc => doc.data().slug.toLowerCase() === decodedSlug);

  if (postDoc) {
    return { id: postDoc.id, ...postDoc.data() };
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
