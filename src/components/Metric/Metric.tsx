import styles from './Metric.module.scss';

type MetricProps = {
  value: string;
  label: string;
};

export default function Metric({ value, label }: MetricProps) {
  return (
    <div className={styles.metric}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}
