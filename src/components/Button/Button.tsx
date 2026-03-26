import React from 'react';
import styles from './Button.module.scss';

type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger';

type ButtonProps = {
  variant?: ButtonVariant;
  onClick?: () => void;
  children: React.ReactNode;
  trailingIcon?: React.ReactNode;
  className?: string;
};

export default function Button({ variant = 'primary', onClick, children, trailingIcon, className }: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${className ?? ''}`}
      onClick={onClick}
      type="button"
    >
      {children}
      {trailingIcon && <span className={styles.trailingIcon}>{trailingIcon}</span>}
    </button>
  );
}
