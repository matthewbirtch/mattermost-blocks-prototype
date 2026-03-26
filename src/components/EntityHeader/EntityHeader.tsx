import styles from './EntityHeader.module.scss';

type Chip = {
  label: string;
  variant?: 'success';
};

type EntityHeaderProps = {
  initials: string;
  title: string;
  subtitle?: string;
  chip?: Chip;
};

export default function EntityHeader({ initials, title, subtitle, chip }: EntityHeaderProps) {
  return (
    <div className={styles.entityHeader}>
      <div className={styles.entityInitials}>{initials}</div>
      <div className={styles.entityText}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.entitySubtitle}>{subtitle}</p>}
      </div>
      {chip && (
        <div className={`${styles.entityChip} ${chip.variant === 'success' ? styles.entityChipSuccess : ''}`}>
          {chip.label}
        </div>
      )}
    </div>
  );
}
