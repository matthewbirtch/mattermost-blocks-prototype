import Button from '../Button/Button';
import styles from './ActionBar.module.scss';

type Action = {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

type ActionBarProps = {
  actions: Action[];
};

export default function ActionBar({ actions }: ActionBarProps) {
  return (
    <div className={styles.actionBar}>
      {actions.map((action) => (
        <Button
          key={action.label}
          variant={action.variant ?? 'secondary'}
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
