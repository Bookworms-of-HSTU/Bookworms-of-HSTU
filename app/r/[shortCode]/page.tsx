
import { redirect } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/client'; // Assuming your client-side firebase init is here

async function getShortUrl(shortCode: string) {
  const shortUrlRef = doc(db, 'shortUrls', shortCode);
  const docSnap = await getDoc(shortUrlRef);

  if (docSnap.exists()) {
    return docSnap.data().longUrl;
  } else {
    return null;
  }
}

export default async function ShortUrlPage({ params }: { params: { shortCode: string } }) {
  const longUrl = await getShortUrl(params.shortCode);

  if (longUrl) {
    redirect(longUrl);
  } else {
    return (
      <div>
        <h1>URL not found</h1>
        <p>The short URL you are looking for does not exist.</p>
      </div>
    );
  }
}
