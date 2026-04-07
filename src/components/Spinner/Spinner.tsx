import type { HTMLAttributes } from 'react';
import styles from './Spinner.module.scss';

export type SpinnerSize = 10 | 12 | 16 | 20 | 24 | 28 | 32;

export interface SpinnerProps extends Omit<
  HTMLAttributes<HTMLSpanElement>,
  'role'
> {
  /** Size of the spinner in pixels. Figma design system values. Default: 16. */
  size?: SpinnerSize;
  /** Use inverted colors for dark/filled backgrounds (e.g. inside a primary button). */
  inverted?: boolean;
  /** Accessible label for screen readers. Default: "Loading". */
  'aria-label'?: string;
}

/**
 * Spinner component for loading states.
 * Renders a conic-gradient ring animated with a CSS rotation.
 * Stroke width scales automatically with size (~10% of diameter, clamped 1–3px).
 *
 * Sizes match the Figma design system: 10, 12, 16, 20, 24, 28, 32px.
 */
export default function Spinner({
  size = 16,
  inverted = false,
  className = '',
  'aria-label': ariaLabel = 'Loading',
  style,
  ...htmlProps
}: SpinnerProps) {
  const strokeWidth = Math.max(1, Math.min(3, Math.round(size * 0.1)));

  const rootClass = [
    styles.spinner,
    inverted ? styles['spinner--inverted'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={rootClass}
      role="status"
      aria-label={ariaLabel}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ['--spinner-stroke-width' as string]: `${strokeWidth}px`,
        ...style,
      }}
      {...htmlProps}
    />
  );
}
