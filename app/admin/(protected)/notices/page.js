
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
  const notices = noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
