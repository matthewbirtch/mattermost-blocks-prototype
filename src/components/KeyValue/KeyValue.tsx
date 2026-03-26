import styles from './KeyValue.module.scss';

type KeyValueProps = {
  label: string;
  value: string;
};

export default function KeyValue({ label, value }: KeyValueProps) {
  return (
    <div className={styles.keyValue}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}
