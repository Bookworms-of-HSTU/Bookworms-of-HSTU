import styles from './Home.module.css';
import Newsletter from './components/Newsletter';
import { adminFirestore } from "@/lib/firebase/server";

// DIAGNOSTIC: Fetch all blog posts to check database connectivity
async function getBlogTitles() {
  try {
    const postsRef = adminFirestore.collection('blogs');
    const querySnapshot = await postsRef.get();
    if (querySnapshot.empty) {
      console.log("Diagnostic: 'blogs' collection is empty or inaccessible.");
      return [];
    }
    const titles = querySnapshot.docs.map(doc => doc.data().title || 'Untitled Post');
    console.log("Diagnostic: Fetched titles:", titles);
    return titles;
  } catch (error) {
    console.error("CRITICAL DIAGNOSTIC ERROR:", error);
    // Return an error message to be displayed on the page
    return [`Error fetching posts: ${error.message}`];
  }
}

export default async function Home() {
  const blogTitles = await getBlogTitles();

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>
          Welcome to <br />
          <span className={styles.highlight}>Bookworms of HSTU</span>
        </h1>
        <p className={styles.subtitle}>Your literary journey starts here.</p>
        <a href="https://forms.gle/nrLYgj6xuGvMQ7CK7" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>Join Us</a>
      </div>

      {/* --- DIAGNOSTIC SECTION --- */}
      <div style={{ padding: '2rem', background: '#f0f0f0', marginTop: '2rem' }}>
        <h2>Diagnostic Info: Blog Posts</h2>
        <p>This section checks if the website can connect to and read from the &apos;blogs&apos; database collection. The results will tell us why the &quot;Post not found&quot; error is occurring.</p>
        {blogTitles && blogTitles.length > 0 ? (
          <ul>
            {blogTitles.map((title, index) => (
              <li key={index}>{title}</li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'red', fontWeight: 'bold' }}>
            No blog titles found. This confirms the database is not being read correctly.
          </p>
        )}
      </div>
      {/* --- END DIAGNOSTIC SECTION --- */}

      <Newsletter />
    </>
  );
}
