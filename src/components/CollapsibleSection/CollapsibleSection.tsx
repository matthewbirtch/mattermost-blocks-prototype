import React, { useState } from 'react';
import ChevronDownIcon from '@mattermost/compass-icons/components/chevron-down';
import ChevronRightIcon from '@mattermost/compass-icons/components/chevron-right';
import styles from './CollapsibleSection.module.scss';

type CollapsibleSectionProps = {
  title: string;
  eventCount?: number;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export default function CollapsibleSection({
  title,
  eventCount,
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
          <span className={styles.chevron}>
            {isOpen ? (
              <ChevronDownIcon size={12} color="rgba(var(--center-channel-color-rgb), 0.75)" />
            ) : (
              <ChevronRightIcon size={12} color="rgba(var(--center-channel-color-rgb), 0.75)" />
            )}
          </span>
          <span className={styles.title}>{title}</span>
        </div>
        {eventCount !== undefined && (
          <span className={styles.count}>{eventCount} events</span>
        )}
      </button>
      {isOpen && <div className={styles.body}>{children}</div>}
    </div>
  );
}
