import { adminDb } from './lib/firebase/server';

const URL = 'https://bookworms-of-hstu.vercel.app';

export default async function sitemap() {
  // 1. Get static routes
  const routes = ['', '/about', '/contact', '/gallery', '/events'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));

  // 2. Get dynamic routes from the 'blogs' collection
  const blogsSnapshot = await adminDb.collection('blogs').get();
  const blogs = blogsSnapshot.docs.map(doc => {
    const data = doc.data();
    // Safer date handling: Use createdAt if it exists, otherwise fallback to the document's update time.
    const lastModifiedDate = data.createdAt?.toDate ? data.createdAt.toDate() : doc.updateTime.toDate();
    return {
      url: `${URL}/blog/${doc.id}`,
      lastModified: lastModifiedDate.toISOString().split('T')[0],
    };
  });

  // 3. Combine and return all routes
  return [...routes, ...blogs];
}
