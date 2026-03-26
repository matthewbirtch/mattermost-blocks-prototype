import styles from './KeyValue.module.scss';

type KeyValueProps = {
  label: string;
  value: string;
  muted?: boolean;
};

export default function KeyValue({ label, value, muted = false }: KeyValueProps) {
  return (
    <div className={styles.keyValue}>
      <span className={styles.label}>{label}</span>
      <span className={`${styles.value} ${muted ? styles.muted : ''}`}>{value}</span>
    </div>
  );
}
