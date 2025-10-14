import Image from 'next/image';
import styles from './page.module.css';

export const metadata = {
  title: 'About Us',
  description: 'Learn about the mission, vision, and the dedicated team behind the Bookworms of HSTU, the official book club of Hajee Mohammad Danesh Science and Technology University.',
};

const committees = {
  'Advisory Committee': [
    { id: 1, name: 'Dr. Advisor', position: 'Chief Advisor', photo: '/images/placeholder.jpg' },
  ],
  'Executive Committee': [
    { id: 2, name: 'John Doe', position: 'President', photo: '/images/placeholder.jpg' },
    { id: 3, name: 'Jane Smith', position: 'Vice President', photo: '/images/placeholder.jpg' },
  ],
  'Trustee Board': [
    { id: 4, name: 'Mr. Trustee', position: 'Chairman', photo: '/images/placeholder.jpg' },
  ],
};

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

export default function About() {
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
    </div>
  );
}
