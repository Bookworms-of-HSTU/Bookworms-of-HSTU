import Image from 'next/image';
import styles from './page.module.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const metadata = {
  title: 'About Us | Bookworms of HSTU',
  description: 'Learn about the mission, vision, and the dedicated team behind the Bookworms of HSTU, the official book club of Hajee Mohammad Danesh Science and Technology University.',
  keywords: 'Bookworms of HSTU, about us, HSTU book club, literary society, committee, team',
};

async function getCommittees() {
  const committeesCollection = collection(db, 'committee');
  const committeesSnapshot = await getDocs(committeesCollection);
  const committeesList = committeesSnapshot.docs.reduce((acc, doc) => {
    const data = doc.data();
    const committeeName = data.committee;
    if (!acc[committeeName]) {
      acc[committeeName] = [];
    }
    acc[committeeName].push({ id: doc.id, ...data });
    return acc;
  }, {});
  return committeesList;
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'Bookworms of HSTU',
  'url': 'https://bookworms-of-hstu.web.app/about',
  'logo': 'https://bookworms-of-hstu.web.app/images/logo.png',
  'description': 'A passionate community of readers and writers at Hajee Mohammad Danesh Science and Technology University.',
  'foundingDate': '2020',
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': 'Hajee Mohammad Danesh Science and Technology University',
    'addressLocality': 'Dinajpur',
    'postalCode': '5200',
    'addressCountry': 'BD'
  },
  'contactPoint': {
    '@type': 'ContactPoint',
    'contactType': 'customer support',
    'email': 'bookworms.hstu@gmail.com'
  }
};

export default async function About() {
  const committees = await getCommittees();

  return (
    <div className={styles.container}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>About Bookworms of HSTU</h1>
          <p className={styles.subtitle}>
            A passionate community of readers and writers at Hajee Mohammad Danesh Science and Technology University.
          </p>
        </div>
      </div>
      <div className={styles.missionSection}>
        <h2 className={styles.sectionTitle}>Our Mission</h2>
        <p>
          Our mission is to foster a love of reading and writing within the HSTU community. We aim to create a vibrant and inclusive environment where students can explore new literary worlds, share their own creative work, and connect with fellow book lovers.
        </p>
      </div>
      
      {Object.entries(committees).map(([committeeName, members]) => (
        <div key={committeeName} className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>{committeeName}</h2>
          <div className={styles.teamGrid}>
            {members.map(member => (
              <div key={member.id} className={styles.teamMember}>
                <Image src={member.photo} alt={member.name} className={styles.teamMemberImage} width={200} height={200} />
                <h3 className={styles.teamMemberName}>{member.name}</h3>
                <p className={styles.teamMemberRole}>{member.position}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <p className={`${styles.developerCredit} ga-trackable`}>
        This website is developed by Golam Kuadir Khan Prince
      </p>
    </div>
  );
}
