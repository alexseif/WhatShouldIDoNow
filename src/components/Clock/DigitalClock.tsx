import React, { useEffect, useState } from 'react';
import styles from './DigitalClock.module.scss';

export const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = time.toLocaleDateString('en-US', options);

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
