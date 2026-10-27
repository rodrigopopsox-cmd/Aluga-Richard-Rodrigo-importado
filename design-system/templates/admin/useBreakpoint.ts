'use client';

import { useEffect, useState } from 'react';

/** m < 760px · t 760–1179px · d ≥ 1180px (see DESIGN.md → Layout). */
export type Breakpoint = 'm' | 't' | 'd';

const read = (): Breakpoint => (window.innerWidth < 760 ? 'm' : window.innerWidth < 1180 ? 't' : 'd');

export function useBreakpoint(): Breakpoint {
  // Server render assumes desktop; the client corrects on mount.
  const [bp, setBp] = useState<Breakpoint>('d');
  useEffect(() => {
    const update = () => setBp(read());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return bp;
}
