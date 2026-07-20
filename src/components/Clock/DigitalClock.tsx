import React, { useState, useEffect } from 'react';
import styles from './DigitalClock.module.scss';

export const DigitalClock: React.FC = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  const formattedDate = now.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={styles.clockContainer}>
      <div className={styles.time}>
        {hours}
        <span className={styles.colon}>:</span>
        {minutes}
        <span className={styles.colon}>:</span>
        {seconds}
      </div>
      <div className={styles.date}>{formattedDate}</div>
    </div>
  );
};
