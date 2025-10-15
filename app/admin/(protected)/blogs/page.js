'use client';

import { useState } from 'react';
import styles from './page.module.css';

const initialBlogs = [
  {
    id: 1,
    title: 'Blog Post 1',
    author: 'Author 1',
    content: 'Content 1',
    image: '/images/placeholder.jpg',
  },
  {
    id: 2,
    title: 'Blog Post 2',
    author: 'Author 2',
    content: 'Content 2',
    image: '/images/placeholder.jpg',
  },
];

export default function Blogs() {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [newBlog, setNewBlog] = useState({ title: '', author: '', content: '', image: '' });
  const [editingBlog, setEditingBlog] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog({ ...newBlog, [name]: value });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    setBlogs([...blogs, { ...newBlog, id: Date.now() }]);
    setNewBlog({ title: '', author: '', content: '', image: '' });
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const handleEditBlog = (blog) => {
    setEditingBlog(blog);
  };

  const handleUpdateBlog = (e) => {
    e.preventDefault();
    setBlogs(blogs.map(blog => blog.id === editingBlog.id ? editingBlog : blog));
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
