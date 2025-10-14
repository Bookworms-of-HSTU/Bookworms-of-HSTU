import { getNotices } from '../lib/actions';

export default async function NoticesPage() {
  const notices = await getNotices();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Notices and News</h1>
      <div className="grid gap-4">
        {notices.map(notice => (
          <div key={notice.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{notice.title}</h2>
            <p>{notice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
