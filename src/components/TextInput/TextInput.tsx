import type { InputHTMLAttributes, ReactNode, ChangeEvent } from 'react'
import { forwardRef, useId, useState, useCallback } from 'react'
import { toKebab } from '@/utils/string'
import styles from './TextInput.module.scss'

export type TextInputSize = 'Small' | 'Medium' | 'Large'

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Optional CSS class name. */
  className?: string
  /** When true, shows invalid/error styling. */
  invalid?: boolean
  /** Label rendered above the input. */
  label?: ReactNode
  /** Leading icon (e.g. <Icon glyph={<SearchIcon size={16} />} size="16" />). */
  leadingIcon?: ReactNode
  /** Max length for the input; used with showCharacterCount for counter. */
  maxLength?: number
  /** When true with maxLength, shows "current / max" character count below input. */
  showCharacterCount?: boolean
  /** Size variant. Figma: Small (32px), Medium (40px), Large (48px). Default: Medium. */
  size?: TextInputSize
  /** Trailing icon. */
  trailingIcon?: ReactNode
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    className = '',
    size = 'Medium',
    label,
    leadingIcon,
    trailingIcon,
    invalid = false,
    maxLength,
    showCharacterCount = false,
    id: idProp,
    value: valueProp,
    defaultValue,
    placeholder,
    onChange,
    disabled,
    readOnly,
    ...rest
  },
  ref,
) {
  const generatedId = useId()
  const id = idProp ?? generatedId

  const isControlled = valueProp !== undefined
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue ?? '')
  const currentValue = isControlled ? (valueProp as string) : uncontrolledValue
  const currentLength = typeof currentValue === 'string' ? currentValue.length : 0

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setUncontrolledValue(e.target.value)
      onChange?.(e)
    },
    [isControlled, onChange],
  )

  const sizeClass = styles[`textInput--size-${toKebab(size)}`]
  const invalidClass = invalid ? styles['textInput--invalid'] : ''
  const hasLeadingClass = leadingIcon != null ? styles['textInput--has-leading-icon'] : ''
  const hasTrailingClass = trailingIcon != null ? styles['textInput--has-trailing-icon'] : ''

  const rootClass = [
    styles.textInput,
    sizeClass,
    invalidClass,
    hasLeadingClass,
    hasTrailingClass,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const counterId = showCharacterCount && maxLength != null ? `${id}-counter` : undefined

  return (
    <div className={rootClass}>
      {label != null && (
        <label className={styles.textInput__label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.textInput__wrapper}>
        <div className={styles.textInput__inner}>
          {leadingIcon != null && (
            <span className={styles.textInput__leadingIcon}>
              {leadingIcon}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            className={styles.textInput__input}
            value={isControlled ? valueProp : undefined}
            defaultValue={isControlled ? undefined : defaultValue}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            readOnly={readOnly}
            aria-invalid={invalid ? true : undefined}
            aria-describedby={counterId}
            onChange={handleChange}
            {...rest}
          />
          {trailingIcon != null && (
            <span className={styles.textInput__trailingIcon}>
              {trailingIcon}
            </span>
          )}
        </div>
      </div>
      {showCharacterCount && maxLength != null && (
        <div
          id={counterId}
          className={styles.textInput__counter}
          aria-live="polite"
        >
          {currentLength} / {maxLength}
        </div>
      )}
    </div>
  )
})

export default TextInput
