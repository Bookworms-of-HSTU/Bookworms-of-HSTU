
import { adminFirestore } from "@/lib/firebase/server";
import NoticeManager from '@/app/components/NoticeManager';

export const dynamic = 'force-dynamic';

async function getNotices() {
  const noticesCollection = adminFirestore.collection("notices");
  const noticeSnapshot = await noticesCollection.orderBy('date', 'desc').get();

  // This is the robust, donkey-proof fix. 
  // It handles any date format in your database to prevent crashes.
  const notices = noticeSnapshot.docs.map(doc => {
    const data = doc.data();
    let dateString = null;

    // Check if the date is a Firestore Timestamp object
    if (data.date && typeof data.date.toDate === 'function') {
      dateString = data.date.toDate().toISOString();
    } 
    // Check if the date is a string or number that can be converted
    else if (data.date) {
      // This handles old data that might have been saved as a string.
      const d = new Date(data.date);
      if (!isNaN(d.getTime())) {
        dateString = d.toISOString();
      }
    }

    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      // Pass the standardized and serialized date string to the client
      date: dateString,
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
