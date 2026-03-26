import styles from './TimelineItem.module.scss';

type TimelineItemProps = {
  title: string;
  detail: string;
  isLast?: boolean;
};

export default function TimelineItem({ title, detail, isLast = false }: TimelineItemProps) {
  return (
    <div className={styles.outer}>
      <div className={`${styles.inner} ${isLast ? styles.last : ''}`}>
        <div className={styles.icon} />
        <div className={styles.content}>
          <span className={styles.title}>{title}</span>
          <span className={styles.detail}>{detail}</span>
        </div>
      </div>
    </div>
  );
}
