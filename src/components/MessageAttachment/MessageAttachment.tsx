import React from 'react';
import KeyValue from '../KeyValue/KeyValue';
import Metric from '../Metric/Metric';
import ActionBar from '../ActionBar/ActionBar';
import EntityHeader from '../EntityHeader/EntityHeader';
import styles from './MessageAttachment.module.scss';

type EntityHeaderProps = {
  initials?: string;
  title: string;
  subtitle?: string;
  chip?: { label: string; variant?: 'success' | 'danger' | 'warning' };
};

type KeyValueField = {
  label: string;
  value: string;
  colSpan?: number;
  muted?: boolean;
};

type MetricItem = {
  value: string;
  label: string;
};

type Action = {
  label: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  onClick?: () => void;
  trailingIcon?: React.ReactNode;
};

type MessageAttachmentProps = {
  header?: EntityHeaderProps;
  title?: string;
  description?: string;
  metrics?: MetricItem[];
  fields?: KeyValueField[];
  fieldColumns?: number;
  children?: React.ReactNode;
  actions?: Action[];
};

export default function MessageAttachment({
  header,
  title,
  description,
  metrics,
  fields,
  fieldColumns = 3,
  children,
  actions,
}: MessageAttachmentProps) {
  return (
    <div className={styles.attachment}>
      <div className={styles.inner}>

        {header && <EntityHeader {...header} />}

        {title && !header && <h2 className={styles.title}>{title}</h2>}

        {description && <p className={styles.description}>{description}</p>}

        {metrics && metrics.length > 0 && (
          <div className={styles.metrics}>
            {metrics.map((metric) => (
              <Metric key={metric.label} value={metric.value} label={metric.label} />
            ))}
          </div>
        )}

        {fields && fields.length > 0 && (
          <div
            className={styles.fields}
            style={{ gridTemplateColumns: `repeat(${fieldColumns}, minmax(0, 1fr))` }}
          >
            {fields.map((field) => (
              <div
                key={field.label}
                style={field.colSpan ? { gridColumn: `span ${field.colSpan}` } : undefined}
              >
                <KeyValue label={field.label} value={field.value} muted={field.muted} />
              </div>
            ))}
          </div>
        )}

        {children}

        {actions && actions.length > 0 && <ActionBar actions={actions} />}
      </div>
    </div>
  );
}
