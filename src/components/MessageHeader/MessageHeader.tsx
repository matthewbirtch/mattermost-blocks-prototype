import LabelTag from '../LabelTag/LabelTag';
import styles from './MessageHeader.module.scss';

type MessageHeaderProps = {
  username: string;
  timestamp: string;
  isBot?: boolean;
  botLabel?: string;
};

export default function MessageHeader({
  username,
  timestamp,
  isBot = false,
  botLabel = 'Bot',
}: MessageHeaderProps) {
  return (
    <div className={styles.header}>
      <span className={styles.username}>{username}</span>
      {isBot && <LabelTag label={botLabel} />}
      <span className={styles.timestamp}>{timestamp}</span>
    </div>
  );
}
