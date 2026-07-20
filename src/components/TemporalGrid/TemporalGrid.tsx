import React, { useEffect, useState } from 'react';
import { AncientTimeSystemColumn } from '../../types/temporal';
import { fetchActiveTemporalBlocks } from '../../services/api';
import styles from './TemporalGrid.module.scss';

export const TemporalGrid: React.FC = () => {
  const [systems, setSystems] = useState<AncientTimeSystemColumn[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    fetchActiveTemporalBlocks()
      .then((data) => {
        if (isMounted) {
          setSystems(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Connecting to Temporal Grid...</div>;
  }

  if (systems.length === 0) {
    return <div className={styles.unavailableMessage}>Not available at the moment.</div>;
  }

  return (
    <section className={styles.section} aria-label="Ancient Wisdom Systems">
      <div className={styles.grid}>
        {systems.map((column) => (
          <div key={column.id} className={`${styles.column} animate-fade-in`}>
            <h2 className={styles.systemTitle}>{column.systemName}</h2>

            <ul className={styles.bulletList}>
              {column.bulletPoints.map((point, idx) => (
                <li key={`${column.id}-pt-${idx}`} className={styles.bulletItem}>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
