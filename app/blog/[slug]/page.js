import Image from 'next/image';
import { adminFirestore } from "@/lib/firebase/server";
import styles from './page.module.css';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

async function getPost(slug) {
    const postsRef = adminFirestore.collection('blogs');
    const querySnapshot = await postsRef.where('slug', '==', slug).limit(1).get();

    if (querySnapshot.empty) {
        return null;
    }

    const postDoc = querySnapshot.docs[0];
    return {
        id: postDoc.id,
        ...postDoc.data(),
    };
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
        <div className={styles.content}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
