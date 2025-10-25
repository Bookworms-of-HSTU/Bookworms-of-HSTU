'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';
import YouTubePlayer from './YouTubePlayer';
import ImageModal from './ImageModal'; // Import the new modal component

function getYouTubeId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function isImgurUrl(url) {
  return url.includes('imgur.com');
}

export default function MediaCarousel({ media }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalImage, setModalImage] = useState(null); // State for the modal

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? media.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === media.length - 1 ? 0 : prevIndex + 1));
  };

  const goToIndex = (index) => {
    setCurrentIndex(index);
  };

  const openModal = (src) => {
    setModalImage(src);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (!media || media.length === 0) {
    return <p>No media to display.</p>;
  }

  const currentMedia = media[currentIndex];
  const videoId = currentMedia.type === 'video' ? getYouTubeId(currentMedia.src) : null;
  const isImgurImage = currentMedia.type === 'image' && isImgurUrl(currentMedia.src);

  const getImgurImageUrl = (src) => {
    return `/api/fetch-imgur-image?url=${encodeURIComponent(src)}`;
  };
  
  const imageSource = isImgurImage ? getImgurImageUrl(currentMedia.src) : currentMedia.src;

  return (
    <>
      <div className={styles.carousel}>
        <button onClick={goToPrevious} className={`${styles.navButton} ${styles.prevButton}`}>
          &lt;
        </button>

        <div className={styles.mediaContainer}>
          {currentMedia.type === 'image' ? (
            <div className={styles.imageContainer} onClick={() => openModal(imageSource)}>
              {isImgurImage ? (
                <img 
                  key={currentMedia.src} 
                  src={imageSource} 
                  alt="Gallery image from Imgur" 
                  className={styles.image} // Re-using the same class with object-fit: contain
                />
              ) : (
                <Image 
                  key={currentMedia.src} 
                  src={imageSource}
                  alt="Gallery image" 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  priority={currentIndex === 0}
                />
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

      {modalImage && (
        <ImageModal 
          src={modalImage}
          alt="Enlarged gallery image"
          onClose={closeModal} 
        />
      )}
    </>
  );
}
