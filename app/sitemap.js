const URL = 'https://bookworms-of-hstu.web.app';

export default async function sitemap() {
  const routes = ['/', '/about', '/contact', '/gallery', '/events'].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }));
 
  return [...routes];
}