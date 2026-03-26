import styles from './Avatar.module.scss';

type AvatarProps = {
  src: string;
  alt: string;
  size?: number;
};

export default function Avatar({ src, alt, size = 32 }: AvatarProps) {
  return (
    <img
      className={styles.avatar}
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size }}
    />
  );
}
