import type { CSSProperties } from 'react';
import styles from './Avatar.module.css';

export interface AvatarProps {
  /** Image URL. Falls back to initials on an ink circle */
  src?: string;
  name?: string;
  size?: number;
  /** Card-colored 2px ring (for overlapping stacks) */
  ring?: boolean;
  className?: string;
  style?: CSSProperties;
}

/** Circular user photo or initials. */
export function Avatar({ src, name = '', size = 40, ring, className, style }: AvatarProps) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
  const cls = [styles.avatar, ring && styles.ring, className].filter(Boolean).join(' ');
  const box: CSSProperties = { width: size, height: size, ...style };
  if (src) {
    return <img src={src} alt={name} className={cls} style={box} />;
  }
  return (
    <span
      role="img"
      aria-label={name}
      className={`${cls} ${styles.initials}`}
      style={{ ...box, fontSize: Math.round(size * 0.36) }}
    >
      {initials}
    </span>
  );
}

export interface AvatarGroupProps {
  people: AvatarProps[];
  size?: number;
  /** How many avatars to show before collapsing into "+N". Default 3 */
  max?: number;
  className?: string;
}

/** Overlapping avatars — assignees on task bars. */
export function AvatarGroup({ people = [], size = 28, max = 3, className }: AvatarGroupProps) {
  const shown = people.slice(0, max);
  const rest = people.length - shown.length;
  const overlap = -size * 0.32;
  return (
    <span className={[styles.group, className].filter(Boolean).join(' ')}>
      {shown.map((p, i) => (
        <Avatar key={i} {...p} size={size} ring style={{ marginLeft: i ? overlap : 0 }} />
      ))}
      {rest > 0 && (
        <span className={styles.more} style={{ marginLeft: overlap, width: size, height: size }}>
          +{rest}
        </span>
      )}
    </span>
  );
}
