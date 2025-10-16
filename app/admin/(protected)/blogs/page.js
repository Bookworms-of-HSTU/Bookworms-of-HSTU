'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Adjust the import path as needed
import styles from './page.module.css';

// Function to generate a URL-friendly slug
const generateSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', content: '', image: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, 'blogs');
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsList = blogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsList);
    };

    fetchBlogs();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    const slug = generateSlug(newBlog.title);
    const blogData = { ...newBlog, slug };
    const docRef = await addDoc(collection(db, 'blogs'), blogData);
    setBlogs([...blogs, { ...blogData, id: docRef.id }]);
    setNewBlog({ title: '', author: '', content: '', image: '' });
  };

  const handleDeleteBlog = async (id) => {
    await deleteDoc(doc(db, 'blogs', id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    const slug = generateSlug(editingBlog.title);
    const blogData = { ...editingBlog, slug };
    const blogDoc = doc(db, 'blogs', editingBlog.id);
    await updateDoc(blogDoc, blogData);
    setBlogs(blogs.map(blog => blog.id === editingBlog.id ? blogData : blog));
    setEditingBlog(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Blogs</h1>

      <div className={styles.addBlogForm}>
        <h2>Add New Blog</h2>
        <form onSubmit={handleAddBlog}>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" value={newBlog.title} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" name="author" value={newBlog.author} onChange={handleInputChange} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={newBlog.content} onChange={handleInputChange}></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input type="text" id="image" name="image" value={newBlog.image} onChange={handleInputChange} />
          </div>
          <button type="submit" className={styles.submitButton}>Add Blog</button>
        </form>
      </div>

      <div className={styles.blogList}>
        <h2>Existing Blogs</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td>
                  <button className={styles.editButton} onClick={() => handleEditBlog(blog)}>Edit</button>
                  <button className={styles.deleteButton} onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingBlog && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Edit Blog</h2>
            <form onSubmit={handleUpdateBlog}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-title">Title</label>
                <input type="text" id="edit-title" name="title" value={editingBlog.title} onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-author">Author</label>
                <input type="text" id="edit-author" name="author" value={editingBlog.author} onChange={(e) => setEditingBlog({ ...editingBlog, author: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-content">Content</label>
                <textarea id="edit-content" name="content" value={editingBlog.content} onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}></textarea>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="edit-image">Image URL</label>
                <input type="text" id="edit-image" name="image" value={editingBlog.image} onChange={(e) => setEditingBlog({ ...editingBlog, image: e.target.value })} />
              </div>
              <button type="submit" className={styles.submitButton}>Update Blog</button>
              <button type="button" className={styles.cancelButton} onClick={() => setEditingBlog(null)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
