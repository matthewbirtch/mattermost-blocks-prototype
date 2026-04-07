import { useCallback, useId, useState, type ChangeEvent } from 'react';
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
  label?: string;
};

export default function Select({
  options,
  value,
  defaultValue,
  placeholder,
  onChange,
  disabled,
  id: idProp,
  label,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;

  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(
    () => defaultValue ?? '',
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const next = e.target.value;
      if (!isControlled) setUncontrolledValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const hasValue = isControlled ? value !== '' : uncontrolledValue !== '';

  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label className={styles.selectLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <div
        className={`${styles.select} ${!hasValue ? styles['select--placeholder'] : ''}`}
      >
        <select
          id={id}
          className={styles.select__input}
          value={isControlled ? value : undefined}
          defaultValue={isControlled ? undefined : (defaultValue ?? '')}
          disabled={disabled}
          onChange={handleChange}
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
    </div>
  );
}
