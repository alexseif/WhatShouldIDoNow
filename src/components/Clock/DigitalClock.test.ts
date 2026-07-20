import { describe, it, expect } from 'vitest';

export const formatClockTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const formatClockDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

describe('DigitalClock formatting logic', () => {
  it('formats time with leading zeros in 24-hour HH:mm:ss format', () => {
    const fixedDate = new Date(2026, 6, 21, 9, 5, 7); // 09:05:07
    expect(formatClockTime(fixedDate)).toBe('09:05:07');
  });

  it('formats date string with weekday, month, day, and year', () => {
    const fixedDate = new Date(2026, 6, 21, 14, 30, 0); // July 21, 2026
    const formatted = formatClockDate(fixedDate);
    expect(formatted).toContain('2026');
    expect(formatted).toContain('July');
  });
});
