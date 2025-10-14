'use client';

import { useState } from 'react';
import { addNotice, updateNotice, deleteNotice } from '../lib/actions';

export default function NoticeManager({ notices: initialNotices }) {
  const [notices, setNotices] = useState(initialNotices);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newNotice, setNewNotice] = useState({ title: '', content: '' });

  const handleAddClick = () => {
    setIsAdding(true);
    setIsEditing(null);
    setNewNotice({ title: '', content: '' });
  };

  const handleEditClick = (notice) => {
    setIsEditing(notice.id);
    setIsAdding(false);
    setNewNotice({ title: notice.title, content: notice.content });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    setNewNotice({ title: '', content: '' });
  };

  const handleSave = async () => {
    if (isAdding) {
      const addedNotice = await addNotice(newNotice);
      setNotices([...notices, addedNotice]);
    } else if (isEditing) {
      const updatedNoticeData = { ...newNotice, id: isEditing };
      const updated = await updateNotice(updatedNoticeData);
      setNotices(notices.map(notice => notice.id === isEditing ? updated : notice));
    }
    handleCancel();
  };

  const handleDelete = async (noticeId) => {
    await deleteNotice(noticeId);
    setNotices(notices.filter(notice => notice.id !== noticeId));
  };

  return (
    <div>
      {notices.map(notice => (
        <div key={notice.id} className="border p-4 mb-4 rounded">
          <h2 className="text-xl font-bold">{notice.title}</h2>
          <p>{notice.content}</p>
          <div className="mt-2">
            <button onClick={() => handleEditClick(notice)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Edit</button>
            <button onClick={() => handleDelete(notice.id)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
          </div>
        </div>
      ))}

      <button onClick={handleAddClick} className="bg-green-500 text-white px-4 py-2 rounded">Add Notice</button>

      {(isAdding || isEditing) && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-xl font-bold mb-2">{isAdding ? 'Add New Notice' : 'Edit Notice'}</h2>
          <input
            type="text"
            placeholder="Title"
            value={newNotice.title}
            onChange={(e) => setNewNotice({ ...newNotice, title: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Content"
            value={newNotice.content}
            onChange={(e) => setNewNotice({ ...newNotice, content: e.target.value })}
            className="border p-2 w-full mb-2"
          />
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
          <button onClick={handleCancel} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      )}
    </div>
  );
}
