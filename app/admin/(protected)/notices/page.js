
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import NoticeManager from '@/app/components/NoticeManager';

async function getNotices() {
  const noticesCollection = collection(db, "notices");
  const noticeSnapshot = await getDocs(noticesCollection);
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
