import styles from './Support.module.css';
import Chatbot from './Chatbot';

export default function Support() {
  return (
    <div className={styles.container}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4">Customer Support</h1>
        <p className="text-xl text-white opacity-90">Get instant help with your courier services</p>
      </div>
      <div className={styles.chatbotWrapper}>
        <Chatbot />
      </div>
    </div>
  );
}