import { useCallback, useSyncExternalStore } from 'react';

export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback((onStoreChange: () => void): (() => void) => {
    const mediaQueryList = window.matchMedia(query);

    mediaQueryList.addEventListener('change', onStoreChange);

    return (): void => mediaQueryList.removeEventListener('change', onStoreChange);
  }, [query]);

  return useSyncExternalStore(
    subscribe,
    (): boolean => window.matchMedia(query).matches,
    (): boolean => false
  );
}
