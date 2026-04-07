import React from 'react';
import Spinner from '@/components/Spinner';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** When true, shows a spinner and disables the button. */
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

// Loading state always uses a gray background, so the spinner is never inverted.

export default function Button({
  variant = 'primary',
  onClick,
  children,
  trailingIcon,
  loading = false,
  disabled = false,
  className,
}: ButtonProps) {
  const rootClass = [
    styles.button,
    styles[variant],
    loading ? styles.loading : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={rootClass}
      onClick={onClick}
      type="button"
      disabled={disabled || loading}
    >
      {loading && (
        <span className={styles.spinner}>
          <Spinner size={16} />
        </span>
      )}
      {children}
      {!loading && trailingIcon && (
        <span className={styles.trailingIcon}>{trailingIcon}</span>
      )}
    </button>
  );
}
