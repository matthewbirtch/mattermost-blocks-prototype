import styles from './UserListItem.module.scss';

type UserListItemProps = {
  avatarSrc: string;
  name: string;
  role: string;
};

export default function UserListItem({ avatarSrc, name, role }: UserListItemProps) {
  return (
    <div className={styles.item}>
      <img className={styles.avatar} src={avatarSrc} alt={name} width={24} height={24} />
      <span className={styles.name}>{name}</span>
      <span className={styles.role}>{role}</span>
    </div>
  );
}
