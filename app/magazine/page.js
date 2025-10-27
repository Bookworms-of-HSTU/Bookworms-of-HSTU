'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const metadata = {
  title: 'Magazines | Bookworms of HSTU',
  description: 'Read and download the official magazines published by the Bookworms of HSTU. Explore our creative works, articles, and more.',
};

export default function MagazinePage() {
  const [magazines, setMagazines] = useState([]);
  const [selectedMagazine, setSelectedMagazine] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      const magazinesCollection = collection(db, 'magazines');
      const magazinesSnapshot = await getDocs(magazinesCollection);
      const magazinesList = magazinesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMagazines(magazinesList);
      if (magazinesList.length > 0) {
        setSelectedMagazine(magazinesList[0]);
      }
    };

    fetchMagazines();
  }, []);

  const handleMagazineChange = (e) => {
    const magazineId = e.target.value;
    const magazine = magazines.find(m => m.id === magazineId);
    setSelectedMagazine(magazine);
  };

  return (
    <div 
      className={styles.container}
      style={selectedMagazine ? { backgroundImage: `url(${selectedMagazine.image})` } : {}}
    >
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Our Magazines</h1>
        <div className={styles.controls}>
          <select 
            className={`${styles.dropdown} ga-trackable`}
            onChange={handleMagazineChange} 
            value={selectedMagazine ? selectedMagazine.id : ''}
            data-ga-action="select_magazine"
            data-ga-category="Magazine"
            data-ga-label="Magazine Dropdown"
          >
            {magazines.map(magazine => (
              <option key={magazine.id} value={magazine.id}>
                {magazine.title}
              </option>
            ))}
          </select>
          {selectedMagazine && (
            <a 
              href={selectedMagazine.pdf} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={`${styles.downloadButton} ga-trackable`}
              data-ga-action="download_magazine"
              data-ga-category="Magazine"
              data-ga-label={selectedMagazine.title}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
