import React from 'react';
import KeyValue from '../KeyValue/KeyValue';
import ActionBar from '../ActionBar/ActionBar';
import styles from './MessageAttachment.module.scss';

type KeyValueField = {
  label: string;
  value: string;
};

type Action = {
  label: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
};

type MessageAttachmentProps = {
  title?: string;
  fields?: KeyValueField[];
  children?: React.ReactNode;
  actions?: Action[];
};

export default function MessageAttachment({
  title,
  fields,
  children,
  actions,
}: MessageAttachmentProps) {
  return (
    <div className={styles.attachment}>
      <div className={styles.inner}>
        {title && <h2 className={styles.title}>{title}</h2>}

        {fields && fields.length > 0 && (
          <div className={styles.fields}>
            {fields.map((field) => (
              <KeyValue key={field.label} label={field.label} value={field.value} />
            ))}
          </div>
        )}

        {children}

        {actions && actions.length > 0 && <ActionBar actions={actions} />}
      </div>
    </div>
  );
}
