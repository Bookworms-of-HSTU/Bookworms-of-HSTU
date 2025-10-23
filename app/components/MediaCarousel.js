'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';
import YouTubePlayer from './YouTubePlayer';

// Function to extract YouTube Video ID from various URL formats
function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function MediaCarousel({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstItem = currentIndex === 0;
    const newIndex = isFirstItem ? media.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastItem = currentIndex === media.length - 1;
    const newIndex = isLastItem ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  if (!media || media.length === 0) {
    return <p>No media to display.</p>;
  }

  const currentMedia = media[currentIndex];
  const videoId = currentMedia.type === 'video' ? getYouTubeId(currentMedia.src) : null;

  return (
    <div className={styles.carousel}>
      <button onClick={goToPrevious} className={`${styles.navButton} ${styles.prevButton}`}>
        &lt;
      </button>

      <div className={styles.mediaContainer}>
        {currentMedia.type === 'image' ? (
          <div className={styles.imageContainer}>
            <Image 
              key={currentMedia.src} 
              src={currentMedia.src} 
              alt="Gallery image" 
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              priority={currentIndex === 0} // Add priority to the first image
            />
          </div>
        ) : videoId ? (
          <YouTubePlayer videoId={videoId} />
        ) : (
          <div className={styles.videoContainer}>
            <video 
              key={currentMedia.src} 
              controls 
              className={styles.video}
            >
              <source src={currentMedia.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        <div className={styles.dots}>
          {media.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              onClick={() => goToIndex(index)}
            ></span>
          ))}
        </div>
      </div>

      <button onClick={goToNext} className={`${styles.navButton} ${styles.nextButton}`}>
        &gt;
      </button>
    </div>
  );
}
