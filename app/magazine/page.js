'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

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
            className={styles.dropdown}
            onChange={handleMagazineChange} 
            value={selectedMagazine ? selectedMagazine.id : ''}
            data-analytics-id="magazine-dropdown"
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
              className={styles.downloadButton}
              data-analytics-id={`magazine-download-${selectedMagazine.id}`}
            >
              Download
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
