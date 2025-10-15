'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

// Mock data - we will replace this with Firebase fetching later when you're ready
const mockMagazines = [
  {
    id: '1',
    title: 'Pustok Prohor - 1st Edition',
    image: '/images/placeholder.jpg', // Using a placeholder image
    pdf: '#' // Placeholder link
  },
  {
    id: '2',
    title: 'Pustok Prohor - 2nd Edition',
    image: '/images/placeholder.jpg', // Using a placeholder image
    pdf: '#' // Placeholder link
  },
    {
    id: '3',
    title: 'Pustok Prohor - 3rd Edition',
    image: '/images/placeholder.jpg', // Using a placeholder image
    pdf: '#' // Placeholder link
  },
];


export default function MagazinePage() {
  const [magazines, setMagazines] = useState([]);
  const [selectedMagazine, setSelectedMagazine] = useState(null);

  useEffect(() => {
    // We'll use the mock data for now
    setMagazines(mockMagazines);
    if (mockMagazines.length > 0) {
      setSelectedMagazine(mockMagazines[0]);
    }
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
