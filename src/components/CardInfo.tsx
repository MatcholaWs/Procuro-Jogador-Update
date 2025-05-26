import styles from './CardInfo.module.css';

interface CardInfoProps {
  icon: string;
  title: string;
  description: string;
  backgroundColor?: string;
}

export default function CardInfo({ icon, title, description, backgroundColor }: CardInfoProps) {
  return (
    <div
      className={styles.card}
      style={{ backgroundColor: backgroundColor || '#3a5550' }}
    >
      <div className={styles.iconWrapper}>
        <i className={`bx bx-${icon}`} style={{ fontSize: '4.5rem', color: 'white' }}></i>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
}
