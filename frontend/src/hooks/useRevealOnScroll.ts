import { useEffect, useRef, useState, type RefObject } from 'react';

import { useMediaQuery } from './useMediaQuery';

type RevealOnScroll<T extends HTMLElement> = {
  isVisible: boolean;
  ref: RefObject<T | null>;
};

export function useRevealOnScroll<T extends HTMLElement>(): RevealOnScroll<T> {
  const ref = useRef<T | null>(null);
  const shouldReduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const [hasEnteredViewport, setHasEnteredViewport] = useState<boolean>(
    (): boolean => typeof IntersectionObserver === 'undefined'
  );

  useEffect((): (() => void) | void => {
    if (shouldReduceMotion || hasEnteredViewport || !ref.current) return;

    const observer = new IntersectionObserver(([entry]): void => {
      if (!entry.isIntersecting) return;

      setHasEnteredViewport(true);
      observer.disconnect();
    }, { threshold: 0.1 });

    observer.observe(ref.current);

    return (): void => observer.disconnect();
  }, [hasEnteredViewport, shouldReduceMotion]);

  return { isVisible: shouldReduceMotion || hasEnteredViewport, ref };
}
