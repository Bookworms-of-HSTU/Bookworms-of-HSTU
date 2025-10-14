import styles from './page.module.css';

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

export default function About() {
  return (
    <div className={styles.container}>
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
                <img src={member.photo} alt={member.name} className={styles.teamMemberImage} />
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
