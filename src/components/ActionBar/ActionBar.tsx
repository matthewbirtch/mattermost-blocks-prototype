import React from 'react';
import Button from '@/components/Button';
import Select, { type SelectOption } from '@/components/Select';
import styles from './ActionBar.module.scss';

type Action = {
  /** Stable key for React reconciliation; prefer when labels may repeat or order changes. */
  id?: string;
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  onClick?: () => void;
  trailingIcon?: React.ReactNode;
};

function actionKey(action: Action, index: number): string {
  return action.id ?? `${index}-${action.label}`;
}

type ActionBarSelect = {
  options: SelectOption[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
};

type ActionBarProps = {
  actions: Action[];
  /** When provided, renders a select input followed by the action buttons. */
  select?: ActionBarSelect;
};

export default function ActionBar({ actions, select }: ActionBarProps) {
  if (select) {
    return (
      <div className={styles.actionBarSelect}>
        <div className={styles.actionBarSelectInput}>
          <Select
            options={select.options}
            placeholder={select.placeholder}
            value={select.value}
            onChange={select.onChange}
          />
        </div>
        {actions.map((action, index) => (
          <Button
            key={actionKey(action, index)}
            variant={action.variant ?? 'primary'}
            onClick={action.onClick}
            trailingIcon={action.trailingIcon}
          >
            {action.label}
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.actionBar}>
      {actions.map((action, index) => (
        <Button
          key={actionKey(action, index)}
          variant={action.variant ?? 'secondary'}
          onClick={action.onClick}
          trailingIcon={action.trailingIcon}
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}
