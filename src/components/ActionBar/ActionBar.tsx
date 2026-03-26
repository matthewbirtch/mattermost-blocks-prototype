import React from 'react';
import Button from '../Button/Button';
import Select, { SelectOption } from '../Select/Select';
import styles from './ActionBar.module.scss';

type Action = {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  onClick?: () => void;
  trailingIcon?: React.ReactNode;
};

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
        {actions.map((action) => (
          <Button
            key={action.label}
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
      {actions.map((action) => (
        <Button
          key={action.label}
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
