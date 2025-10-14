import Image from 'next/image';
import styles from './page.module.css';
import { magazines } from '../../data/magazines';

export default function Magazine() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Magazines</h1>
      <div className={styles.magazineGrid}>
        {magazines.map((magazine) => (
          <div key={magazine.id} className={styles.magazineCard}>
            <Image src={magazine.cover} alt={magazine.title} className={styles.magazineCover} width={300} height={400} />
            <h2 className={styles.magazineTitle}>{magazine.title}</h2>
            <p className={styles.magazineDate}>{magazine.date}</p>
            <a href={magazine.url} target="_blank" rel="noopener noreferrer" className={styles.readButton}>
              Read Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
