import '@testing-library/jest-dom/vitest';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: true,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
});

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly scrollMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  disconnect(): void {}

  observe(): void {}

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(): void {}
}

window.IntersectionObserver = MockIntersectionObserver;
globalThis.IntersectionObserver = MockIntersectionObserver;
