import CircleMediumIcon from '@mattermost/compass-icons/components/record-circle-outline';
import styles from './TimelineItem.module.scss';

type TimelineItemProps = {
  title: string;
  detail: string;
  isLast?: boolean;
};

export default function TimelineItem({ title, detail, isLast = false }: TimelineItemProps) {
  return (
    <div className={`${styles.item} ${isLast ? styles.last : ''}`}>
      <div className={styles.icon}>
        <CircleMediumIcon size={16} color="var(--center-channel-color)" />
      </div>
      <div className={styles.content}>
        <span className={styles.title}>{title}</span>
        <span className={styles.detail}>{detail}</span>
      </div>
    </div>
  );
}
