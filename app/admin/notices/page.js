import { getNotices } from '@/app/lib/actions';
import NoticeManager from '@/app/components/NoticeManager';

export default async function AdminNoticesPage() {
  const notices = await getNotices();

  return (
    <div>
      <NoticeManager notices={notices} />
    </div>
  );
}
