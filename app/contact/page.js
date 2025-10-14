import styles from './page.module.css';

export const metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Bookworms of HSTU. Send us a message for inquiries, collaborations, or to join our community. We look forward to hearing from you!',
};

export default function Contact() {
  return (
    <div className={styles.container} data-analytics-section="contact-page">
      <h1 className={styles.title}>Contact Us</h1>
      <form className={styles.form} data-analytics-id="contact-form-submission">
        <div className={styles.formGroup}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required data-analytics-id="contact-form-name-input" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required data-analytics-id="contact-form-email-input" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="5" required data-analytics-id="contact-form-message-input"></textarea>
        </div>
        <button type="submit" className={styles.submitButton} data-analytics-id="contact-form-send-button">Send Message</button>
      </form>
    </div>
  );
}
