import type { ChangeEvent, InputHTMLAttributes } from 'react'
import { useId } from 'react'
import CheckIcon from '@mattermost/compass-icons/components/check'
import { useControllable } from '@/hooks/useControllable'
import { Icon } from '@/components/Icon'
import styles from './MultiSelectPicker.module.scss'

export interface MultiSelectPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  /** The label text for this option. */
  label: string
  /** Optional description shown below the label. */
  description?: string
  /** Show bottom separator line when unchecked. Default: true. */
  border?: boolean
  /** Optional CSS class. */
  className?: string
}

/**
 * MultiSelectPicker is a row item for multi-selection lists in interactive posts.
 * The entire row acts as a checkbox label — clicking anywhere toggles the selection.
 * Shows a checkbox visual, a label, and an optional description.
 * Applies active (checked) and hover styling per Figma MM-XXXXX v2.0.
 *
 * Use inside a container with role="group" or a <fieldset> for accessible grouping.
 */
export default function MultiSelectPicker({
  label,
  description,
  border = true,
  className = '',
  id: idProp,
  checked,
  defaultChecked,
  disabled,
  onChange,
  ...rest
}: MultiSelectPickerProps) {
  const generatedId = useId()
  const id = idProp ?? generatedId
  const [resolvedChecked, handleChange] = useControllable(checked, defaultChecked, onChange as ((e: ChangeEvent<HTMLInputElement>) => void) | undefined)

  const rootClass = [
    styles['multi-select-picker'],
    resolvedChecked ? styles['multi-select-picker--checked'] : '',
    disabled ? styles['multi-select-picker--disabled'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={rootClass} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={styles['multi-select-picker__input']}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={handleChange}
        {...rest}
      />
      <span className={styles['multi-select-picker__checkbox']}>
        {resolvedChecked && (
          <span className={styles['multi-select-picker__check-icon']}>
            <Icon glyph={<CheckIcon size={16} />} size="16" />
          </span>
        )}
      </span>
      <div className={styles['multi-select-picker__content']}>
        <span className={styles['multi-select-picker__label']}>{label}</span>
        {description && (
          <span className={styles['multi-select-picker__description']}>{description}</span>
        )}
      </div>
      {!resolvedChecked && border && (
        <span className={styles['multi-select-picker__separator']} aria-hidden />
      )}
    </label>
  )
}
