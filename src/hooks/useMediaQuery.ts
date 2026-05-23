import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => window.matchMedia(query).matches);

  useEffect((): (() => void) => {
    const mediaQueryList = window.matchMedia(query);

    function handleChange(event: MediaQueryListEvent): void {
      setMatches(event.matches);
    }

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener('change', handleChange);

    return (): void => mediaQueryList.removeEventListener('change', handleChange);
  }, [query]);

  return matches;
}
