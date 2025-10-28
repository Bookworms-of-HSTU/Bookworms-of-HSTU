
import { adminFirestore } from "@/lib/firebase/server";
import NoticeManager from '@/app/components/NoticeManager';

// This is the crucial fix: It forces the page to be dynamically rendered on every request,
// ensuring that the data fetched from Firestore is always live and never cached.
export const dynamic = 'force-dynamic';

async function getNotices() {
  // Using the server-side adminFirestore ensures we are fetching data fresh from the server.
  const noticesCollection = adminFirestore.collection("notices");
  // Ordering by date to ensure the newest notices appear first.
  const noticeSnapshot = await noticesCollection.orderBy('date', 'desc').get();
  
  // This is the critical fix. We manually destructure the data and convert the 
  // Firestore Timestamp to a serializable ISO string before passing it to the client component.
  // This resolves the "Only plain objects can be passed to Client Components" error.
  const notices = noticeSnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      date: data.date.toDate().toISOString(), // Convert Timestamp to ISO string
    };
  });

  return notices;
}

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div>
      <NoticeManager notices={notices} />
    </div>
  );
}
