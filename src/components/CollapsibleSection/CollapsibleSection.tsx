import React, { useState } from 'react';
import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import styles from './CollapsibleSection.module.scss';

type CollapsibleSectionProps = {
  title: string;
  badge?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleSection({
  title,
  badge,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={styles.section}>
      <button
        className={styles.header}
        onClick={() => setIsOpen((prev) => !prev)}
        type="button"
        aria-expanded={isOpen}
      >
        <div className={styles.headerLeft}>
          <span
            className={`${styles.chevron} ${isOpen ? styles['chevron--open'] : ''}`}
          >
            <ChevronDownIcon
              size={12}
              color="rgba(var(--center-channel-color-rgb), 0.75)"
            />
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        {badge !== undefined && <span className={styles.count}>{badge}</span>}
      </button>
      <div
        className={`${styles.bodyWrapper} ${isOpen ? styles['bodyWrapper--open'] : ''}`}
      >
        <div className={styles.bodyInner}>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
