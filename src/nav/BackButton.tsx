import { Link } from 'react-router-dom';
import ChevronLeftIcon from '@mattermost/compass-icons/components/chevron-left';
import styles from './BackButton.module.scss';

export default function BackButton() {
  return (
    <Link to="/" className={styles.backButton}>
      <ChevronLeftIcon size={16} color="currentColor" />
      Back
    </Link>
  );
}
