import type { ReactNode } from 'react';
import EmoticonHappyOutlineIcon from '@mattermost/compass-icons/components/emoticon-happy-outline';
import styles from './Icon.module.scss';

export type IconSize =
  | '10'
  | '12'
  | '16'
  | '20'
  | '24'
  | '28'
  | '32'
  | '40'
  | '52'
  | '64'
  | '104';

export interface IconProps {
  /** Optional CSS class name. */
  className?: string;
  /** Icon content from @mattermost/compass-icons (e.g. <GlobeIcon size={16} />). When omitted, shows emoticon-happy-outline. */
  glyph?: ReactNode | null;
  /** Size from the Mattermost icon scale. Default 24. */
  size?: IconSize;
  /**
   * When set (non-empty), the icon is exposed to assistive technology as a single image with this label.
   * Omit for decorative icons (e.g. beside visible text); those use `aria-hidden` and no `role="img"`.
   */
  ariaLabel?: string;
  /** Optional native tooltip on the icon wrapper. */
  title?: string;
}

const SIZE_CLASS_MAP: Record<IconSize, string> = {
  '10': styles['icon--size-10'],
  '12': styles['icon--size-12'],
  '16': styles['icon--size-16'],
  '20': styles['icon--size-20'],
  '24': styles['icon--size-24'],
  '28': styles['icon--size-28'],
  '32': styles['icon--size-32'],
  '40': styles['icon--size-40'],
  '52': styles['icon--size-52'],
  '64': styles['icon--size-64'],
  '104': styles['icon--size-104'],
};

/**
 * Icon wrapper using @mattermost/compass-icons. Import the icon you need and pass as glyph.
 *
 * **Decorative (default):** hidden from the accessibility tree (`aria-hidden`). Use next to text labels.
 * **Meaningful:** pass `ariaLabel` so the root uses `role="img"` and `aria-label` (glyph subtree is hidden to avoid duplicate announcements).
 *
 * @see https://compass.mattermost.com/29be2c109/p/19c648-iconography
 */
export default function Icon({
  className = '',
  glyph = null,
  size = '24',
  ariaLabel,
  title,
}: IconProps) {
  const sizeClass = SIZE_CLASS_MAP[size];
  const rootClass = [styles.icon, sizeClass, className]
    .filter(Boolean)
    .join(' ');
  const sizePx = Number(size);
  const a11yLabel = ariaLabel?.trim() ?? '';
  const meaningful = a11yLabel.length > 0;

  const glyphContent =
    glyph !== undefined && glyph !== null ? (
      glyph
    ) : (
      <EmoticonHappyOutlineIcon
        size={sizePx}
        className={styles['icon__glyph']}
        aria-hidden
      />
    );

  const rootA11y = meaningful
    ? {
        role: 'img' as const,
        'aria-label': a11yLabel,
        ...(title !== undefined ? { title } : {}),
      }
    : {
        'aria-hidden': true as const,
        ...(title !== undefined ? { title } : {}),
      };

  return (
    <div className={rootClass} {...rootA11y}>
      <div
        className={styles['icon__glyph-area']}
        aria-hidden={meaningful || undefined}
      >
        {glyphContent}
      </div>
    </div>
  );
}
