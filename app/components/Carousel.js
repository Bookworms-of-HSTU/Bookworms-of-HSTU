'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Carousel.module.css';

export default function Carousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToImage = (imageIndex) => {
    setCurrentIndex(imageIndex);
  };

  return (
    <div className={styles.carousel}>
      <button onClick={goToPrevious} className={`${styles.navButton} ${styles.prevButton}`}>
        &lt;
      </button>
      <div className={styles.imageContainer}>
        <Image src={images[currentIndex]} alt="" width={500} height={300} className={styles.image} />
        <div className={styles.dots}>
          {images.map((_, index) => (
            <span
              key={index}
              className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
              onClick={() => goToImage(index)}
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
