import { useId } from 'react';
import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import styles from './Select.module.scss';

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  id?: string;
};

export default function Select({
  options,
  value,
  defaultValue,
  placeholder,
  onChange,
  disabled,
  id: idProp,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const hasValue = value !== undefined ? value !== '' : defaultValue !== undefined && defaultValue !== '';

  return (
    <div className={`${styles.select} ${!hasValue ? styles['select--placeholder'] : ''}`}>
      <select
        id={id}
        className={styles.select__input}
        value={value}
        defaultValue={defaultValue ?? ''}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className={styles.select__icon} aria-hidden>
        <ChevronDownIcon size={16} color="currentColor" />
      </span>
    </div>
  );
}
