'use client';

import { useCallback, useSyncExternalStore } from 'react';

// localStorage-backed state that is safe to server-render (server snapshot = fallback) and
// stays in sync across tabs. Failures (private mode, blocked storage) fall back silently.
const EVENT = 'aluga-storage';

const subscribe = (notify: () => void) => {
  window.addEventListener('storage', notify);
  window.addEventListener(EVENT, notify);
  return () => {
    window.removeEventListener('storage', notify);
    window.removeEventListener(EVENT, notify);
  };
};

const read = (key: string): string | null => {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
};

export function useStoredState<T extends string>(key: string, fallback: T): [T, (value: T) => void] {
  const value = useSyncExternalStore(
    subscribe,
    () => (read(key) as T | null) ?? fallback,
    () => fallback,
  );
  const set = useCallback(
    (next: T) => {
      try {
        window.localStorage.setItem(key, next);
      } catch {
        // storage unavailable — keep working for this render only
      }
      window.dispatchEvent(new Event(EVENT));
    },
    [key],
  );
  return [value, set];
}
