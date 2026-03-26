import React from 'react';
import Avatar from '../Avatar/Avatar';
import MessageHeader from '../MessageHeader/MessageHeader';
import styles from './Post.module.scss';

type PostProps = {
  avatarSrc: string;
  avatarAlt: string;
  username: string;
  timestamp: string;
  isBot?: boolean;
  children: React.ReactNode;
};

export default function Post({
  avatarSrc,
  avatarAlt,
  username,
  timestamp,
  isBot = false,
  children,
}: PostProps) {
  return (
    <div className={styles.post}>
      <div className={styles.message}>
        <div className={styles.avatarCol}>
          <Avatar src={avatarSrc} alt={avatarAlt} size={32} />
        </div>
        <div className={styles.content}>
          <MessageHeader username={username} timestamp={timestamp} isBot={isBot} />
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </div>
  );
}
