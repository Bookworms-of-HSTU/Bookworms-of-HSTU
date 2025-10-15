'use client';

export default function imageLoader({ src, width, quality }) {
  return `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(src)}?alt=media`;
}
