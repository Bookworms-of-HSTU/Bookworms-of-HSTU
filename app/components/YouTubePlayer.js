'use client';

import styles from './YouTubePlayer.module.css';

export default function YouTubePlayer({ videoId }) {
  return (
    <div className={styles.youtubeContainer}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded YouTube Video"
      ></iframe>
    </div>
  );
}
