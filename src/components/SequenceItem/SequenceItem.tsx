import CheckIcon from '@mattermost/compass-icons/components/check';
import styles from './SequenceItem.module.scss';

export type SequenceItemStatus = 'completed' | 'active' | 'pending';

type SequenceItemProps = {
  step: number;
  title: string;
  detail?: string;
  status?: SequenceItemStatus;
  isLast?: boolean;
};

export default function SequenceItem({
  step,
  title,
  detail,
  status = 'pending',
  isLast = false,
}: SequenceItemProps) {
  return (
    <div className={styles.outer}>
      <div className={`${styles.inner} ${isLast ? styles.last : ''}`}>
        <div className={`${styles.badge} ${styles[status]}`}>
          {status === 'completed' ? (
            <CheckIcon size={12} color="white" />
          ) : (
            <span className={styles.stepNumber}>{step}</span>
          )}
        </div>
        <div className={styles.content}>
          <span
            className={`${styles.title} ${status === 'completed' ? styles.strikethrough : ''}`}
          >
            {title}
          </span>
          {detail && <span className={styles.detail}>{detail}</span>}
        </div>
      </div>
    </div>
  );
}
