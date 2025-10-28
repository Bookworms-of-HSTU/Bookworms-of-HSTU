
import NoticesClient from './NoticesClient';
import { adminFirestore } from '@/lib/firebase/server';
import { Timestamp } from 'firebase-admin/firestore';

export const metadata = {
  title: 'Notices & News | Bookworms of HSTU',
  description: 'Stay up-to-date with the latest news, announcements, and notices from the Bookworms of HSTU.',
};

const NOTICES_PER_PAGE = 10;

async function getNotices(lastVisible) {
  let noticesQuery = adminFirestore.collection('notices').orderBy('date', 'desc').limit(NOTICES_PER_PAGE);

  if (lastVisible) {
    const lastVisibleDoc = await adminFirestore.collection('notices').doc(lastVisible).get();
    if (lastVisibleDoc.exists) {
        noticesQuery = noticesQuery.startAfter(lastVisibleDoc);
    }
  }

  const noticeSnapshot = await noticesQuery.get();
  const notices = noticeSnapshot.docs.map(doc => {
    const data = doc.data();
    let dateString = null;
    if (data.date && typeof data.date.toDate === 'function') {
      dateString = data.date.toDate().toISOString();
    } else if (data.date) {
      const d = new Date(data.date);
      if (!isNaN(d.getTime())) {
        dateString = d.toISOString();
      }
    }
    return {
      id: doc.id,
      title: data.title,
      content: data.content,
      date: dateString,
    };
  });

  const newLastVisible = noticeSnapshot.docs.length > 0 ? noticeSnapshot.docs[noticeSnapshot.docs.length - 1].id : null;

  return { notices, lastVisible: newLastVisible };
}

export default async function NoticesPage({ searchParams }) {
    const { notices, lastVisible } = await getNotices(searchParams.lastVisible);
  return <NoticesClient initialNotices={notices} initialLastVisible={lastVisible} />;
}
