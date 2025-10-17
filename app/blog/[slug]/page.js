import Image from 'next/image';
import { adminFirestore } from "@/lib/firebase/server";
import styles from './page.module.css';

async function getPost(slug) {
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const postsRef = adminFirestore.collection('blogs');
  const querySnapshot = await postsRef.get();

  if (querySnapshot.empty) {
    return { post: null, availableSlugs: [] };
  }

  const allSlugs = querySnapshot.docs.map(doc => doc.data().slug);
  const postDoc = querySnapshot.docs.find(doc => doc.data().slug.toLowerCase() === decodedSlug);

  if (postDoc) {
    return { post: { id: postDoc.id, ...postDoc.data() }, availableSlugs: null };
  } else {
    // If post is not found, return all available slugs for diagnostics
    return { post: null, availableSlugs: allSlugs };
  }
}

export default async function Post({ params }) {
  const { post, availableSlugs } = await getPost(params.slug);

  if (!post) {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Post Not Found</h1>
        <p>We could not find a post with the requested identifier.</p>
        <hr />
        <h2>Diagnostic Information</h2>
        <p>This information will help us solve the problem.</p>
        <p><b>Requested Slug from URL:</b> {params.slug}</p>
        <p><b>Available Slugs in Database:</b></p>
        {availableSlugs && availableSlugs.length > 0 ? (
          <ul style={{ background: '#f0f0f0', padding: '1rem' }}>
            {availableSlugs.map((s, index) => (
              <li key={index}><code>{s}</code></li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'red' }}>Could not retrieve any slugs from the database.</p>
        )}
      </div>
    );
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
