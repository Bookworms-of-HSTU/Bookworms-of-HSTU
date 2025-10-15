
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import styles from './Notices.module.css';

async function getNotices() {
  const noticesCollection = collection(db, "notices");
  const noticeSnapshot = await getDocs(noticesCollection);
  const notices = noticeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return notices;
}

export default async function NoticesPage() {
  const notices = await getNotices();

  // Sort notices by date in descending order
  const sortedNotices = notices.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className={styles.noticesPage}>
      <div className={styles.container}>
        <h1 className={styles.title}>Notices and News</h1>
        <div className={styles.noticesGrid}>
          {sortedNotices.map(notice => (
            <div key={notice.id} className={styles.noticeCard}>
              <div className={styles.noticeContent}>
                <h2 className={styles.noticeTitle}>{notice.title}</h2>
                <p className={styles.noticeDate}>{new Date(notice.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className={styles.noticeText}>{notice.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
