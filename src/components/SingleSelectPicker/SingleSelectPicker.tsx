import type { KeyboardEvent, MouseEvent } from 'react'
import styles from './SingleSelectPicker.module.scss'

export interface SingleSelectPickerProps {
  /** The label text for this option. */
  label: string
  /** Optional description shown below the label. */
  description?: string
  /** The number displayed in the badge (1-based index). */
  index: number
  /** Whether this option is currently selected. */
  selected?: boolean
  /** Show bottom separator line when unselected. Default: true. */
  border?: boolean
  /** Called when the row is clicked or activated via keyboard. */
  onClick?: (e: MouseEvent<HTMLDivElement> | KeyboardEvent<HTMLDivElement>) => void
  /** Optional CSS class. */
  className?: string
}

/**
 * SingleSelectPicker is a row item for single-selection lists in interactive posts.
 * Shows a numbered badge, a label, and an optional description.
 * Applies active (selected) and hover styling per Figma MM-XXXXX v2.0.
 *
 * Use inside a container with role="listbox" for accessible grouping.
 */
export default function SingleSelectPicker({
  label,
  description,
  index,
  selected = false,
  border = true,
  onClick,
  className = '',
}: SingleSelectPickerProps) {
  const rootClass = [
    styles['single-select-picker'],
    selected ? styles['single-select-picker--selected'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick?.(e)
    }
  }

  return (
    <div
      className={rootClass}
      role="option"
      aria-selected={selected}
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    >
      <span className={styles['single-select-picker__badge']} aria-hidden>
        {index}
      </span>
      <div className={styles['single-select-picker__content']}>
        <span className={styles['single-select-picker__label']}>{label}</span>
        {description && (
          <span className={styles['single-select-picker__description']}>{description}</span>
        )}
      </div>
      {!selected && border && (
        <span className={styles['single-select-picker__separator']} aria-hidden />
      )}
    </div>
  )
}
