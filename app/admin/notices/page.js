import { getNotices } from '../lib/actions';
import NoticeManager from '../components/NoticeManager';

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Notices and News</h1>
      <NoticeManager notices={notices} />
    </div>
  );
}
