import React from 'react';
import { UserAvatar } from '@/components/UserAvatar';
import MessageHeader from '@/components/MessageHeader';
import styles from './Post.module.scss';

type PostProps = {
  avatarSrc: string;
  avatarAlt: string;
  username: string;
  timestamp: string;
  isBot?: boolean;
  botLabel?: string;
  children: React.ReactNode;
};

export default function Post({
  avatarSrc,
  avatarAlt,
  username,
  timestamp,
  isBot = false,
  botLabel,
  children,
}: PostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.message}>
        <div className={styles.avatarCol}>
          <UserAvatar src={avatarSrc} alt={avatarAlt} size="32" />
        </div>
        <div className={styles.content}>
          <MessageHeader
            username={username}
            timestamp={timestamp}
            isBot={isBot}
            botLabel={botLabel}
          />
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
