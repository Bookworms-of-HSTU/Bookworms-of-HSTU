import { adminDb } from './lib/firebase/server';

// Use the VERCEL_URL environment variable provided by Vercel to build the canonical URL.
// Fallback to a localhost default for local development.
const URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap() {
  // 1. Get static routes
    // I've updated this list to include all valid pages and removed non-existent ones.
  const routes = ['', '/about', '/contact', '/gallery', '/library', '/magazine', '/notices', '/blog'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // 2. Get dynamic routes from the 'blogs' collection
  try {
    const blogsSnapshot = await adminDb.collection('blogs').get();
    const blogs = blogsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Safer date handling
      const lastModifiedDate = data.createdAt?.toDate ? data.createdAt.toDate() : doc.updateTime.toDate();
      return {
        url: `${URL}/blog/${doc.id}`,
        lastModified: lastModifiedDate.toISOString().split('T')[0],
      };
    });
    
    // 3. Combine and return all routes
    return [...routes, ...blogs];

  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
    // If we can't fetch dynamic routes, return just the static ones.
    // This prevents the entire build from failing if Firestore is unreachable.
    return routes;
  }
}
