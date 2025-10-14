'use client';

import { useState } from 'react';
import styles from './page.module.css';
import { photos } from '../../data/photos';
import 'yet-another-react-lightbox/styles.css';
import Lightbox from 'yet-another-react-lightbox';
import Image from 'next/image';

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gallery</h1>
      <div className={styles.galleryGrid}>
        {photos.map((photo, i) => (
          <div key={photo.src} className={styles.photo} onClick={() => setIndex(i)}>
            <Image src={photo.src} alt="" width={photo.width} height={photo.height} />
          </div>
        ))}
      </div>
      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={photos}
      />
    </div>
  );
}
