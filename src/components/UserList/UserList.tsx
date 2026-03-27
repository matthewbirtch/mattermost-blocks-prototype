import { useState } from 'react';
import MagnifyIcon from '@mattermost/compass-icons/components/magnify';
import TextInput from '../TextInput/TextInput';
import UserListItem from '../UserListItem/UserListItem';
import styles from './UserList.module.scss';

type UserEntry = {
  avatarSrc: string;
  name: string;
  role: string;
};

type UserListProps = {
  users: UserEntry[];
  filterPlaceholder?: string;
};

export default function UserList({ users, filterPlaceholder = 'Filter users…' }: UserListProps) {
  const [query, setQuery] = useState('');

  const filtered = query.trim()
    ? users.filter((u) =>
        u.name.toLowerCase().includes(query.toLowerCase()) ||
        u.role.toLowerCase().includes(query.toLowerCase())
      )
    : users;

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <TextInput
          placeholder={filterPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leadingIcon={<MagnifyIcon size={16} color="currentColor" />}
        />
      </div>
      <div className={styles.list}>
        {filtered.map((user) => (
          <UserListItem key={user.name} avatarSrc={user.avatarSrc} name={user.name} role={user.role} />
        ))}
        {filtered.length === 0 && (
          <p className={styles.empty}>No users match "{query}"</p>
        )}
      </div>
    </div>
  );
}
