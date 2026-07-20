import React, { useEffect, useState } from 'react';
import styles from './DigitalClock.module.scss';

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

/**
 * Formats a Date object into two-digit HH, MM, SS strings and a localized full date representation.
 *
 * @param date - The Date object to format.
 * @returns Object containing formatted hours, minutes, seconds, and date string.
 */
const formatClockDisplay = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const formattedDate = date.toLocaleDateString('en-US', DATE_FORMAT_OPTIONS);

  return { hours, minutes, seconds, formattedDate };
};

/**
 * DigitalClock Component
 * Displays real-time ticking clock (HH:MM:SS) and date.
 * Throttles interval ticking when the document/tab is hidden to optimize performance and CPU usage.
 */
export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<Date>(() => new Date());

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => setTime(new Date()), 1000);
      }
    };

    const stopTimer = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        setTime(new Date());
        startTimer();
      }
    };

    if (!document.hidden) {
      startTimer();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopTimer();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const { hours, minutes, seconds, formattedDate } = formatClockDisplay(time);

  return (
    <div className={styles.clockContainer}>
      <div className={styles.time} aria-label={`Current time ${hours}:${minutes}:${seconds}`}>
        <span>{hours}</span>
        <span className={styles.colon}>:</span>
        <span>{minutes}</span>
        <span className={styles.colon}>:</span>
        <span>{seconds}</span>
      </div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};

