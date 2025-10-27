'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';
import YouTubePlayer from './YouTubePlayer';

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function isImgurUrl(url) {
  return url.includes('imgur.com');
}

export default function MediaCarousel({ media, priority = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgurImageUrl, setImgurImageUrl] = useState('');

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const currentMedia = media[currentIndex];
  const isImgurImage = currentMedia.type === 'image' && isImgurUrl(currentMedia.src);

  useEffect(() => {
    if (isImgurImage) {
      fetch(`/api/fetch-imgur-image?url=${encodeURIComponent(currentMedia.src)}`)
        .then((res) => res.json())
        .then((data) => {
          setImgurImageUrl(data.imageUrl);
        });
    }
  }, [currentIndex, isImgurImage, currentMedia.src]);

  if (!media || media.length === 0) {
    return <p>No media to display.</p>;
  }
  
  const videoId = currentMedia.type === 'video' ? getYouTubeId(currentMedia.src) : null;
  const imageSource = isImgurImage ? imgurImageUrl : currentMedia.src;

  return (
    <div className={styles.carousel}>
      <button 
        onClick={goToPrevious} 
        className={`${styles.navButton} ${styles.prevButton} ga-trackable`}
        data-ga-action="click_carousel_nav"
        data-ga-category="Gallery Carousel"
        data-ga-label="Previous"
      >
        &lt;
      </button>

      <div className={styles.mediaContainer}>
        {currentMedia.type === 'image' ? (
          <div className={styles.imageContainer}>
            {imageSource && (
              <a href={imageSource} target="_blank" rel="noopener noreferrer" className={`${styles.fillLink} ga-trackable`}>
                <Image 
                  key={imageSource} 
                  src={imageSource}
                  alt="Gallery image" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={priority}
                  data-ga-action="click_carousel_image"
                  data-ga-category="Gallery Carousel"
                  data-ga-label={imageSource}
                />
              </a>
            )}
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
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''} ga-trackable`}
              onClick={() => goToIndex(index)}
              data-ga-action="click_carousel_dot"
              data-ga-category="Gallery Carousel"
              data-ga-label={`Dot ${index + 1}`}
            ></span>
          ))}
        </div>
      </div>

      <button 
        onClick={goToNext} 
        className={`${styles.navButton} ${styles.nextButton} ga-trackable`}
        data-ga-action="click_carousel_nav"
        data-ga-category="Gallery Carousel"
        data-ga-label="Next"
      >
        &gt;
      </button>
    </div>
  );
}
