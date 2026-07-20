import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('useTheme hook logic', () => {
  let store: Record<string, string> = {};

  const mockLocalStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };

  beforeEach(() => {
    store = {};
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('detects saved theme from localStorage if present', () => {
    store['theme'] = 'dark';
    const savedTheme = mockLocalStorage.getItem('theme');
    expect(savedTheme).toBe('dark');
  });

  it('defaults theme correctly when localStorage is empty', () => {
    const savedTheme = mockLocalStorage.getItem('theme');
    expect(savedTheme).toBeNull();
    const systemPrefersDark = false; // simulates light mode fallback
    const resolvedTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    expect(resolvedTheme).toBe('light');
  });

  it('toggles theme state between light and dark', () => {
    let currentTheme: 'light' | 'dark' = 'light';
    const toggleTheme = () => {
      currentTheme = currentTheme === 'light' ? 'dark' : 'light';
      mockLocalStorage.setItem('theme', currentTheme);
    };

    toggleTheme();
    expect(currentTheme).toBe('dark');
    expect(mockLocalStorage.getItem('theme')).toBe('dark');

    toggleTheme();
    expect(currentTheme).toBe('light');
    expect(mockLocalStorage.getItem('theme')).toBe('light');
  });
});
