'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function MagazineClient() {
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
            data-ga-category="Magazine Page"
            data-ga-action="Select"
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
              data-ga-category="Magazine Page"
              data-ga-action="Click"
              data-ga-label={`${selectedMagazine.title} Download Button`}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
