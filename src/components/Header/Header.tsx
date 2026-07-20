import React, { useState } from 'react';
import { Theme } from '../../hooks/useTheme';
import styles from './Header.module.scss';

interface HeaderProps {
  theme: Theme;
  onToggleTheme: (event?: React.MouseEvent) => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, onToggleTheme }) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  return (
    <div className={styles.headerWrapper}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <h1 className={styles.title}>What Should I Do Now</h1>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={(e) => onToggleTheme(e)}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg viewBox="0 0 24 24">
                <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-5.4-5.4c0-1.81.89-3.42 2.26-4.4C12.92 3.04 12.46 3 12 3z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24">
                <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37a.996.996 0 0 0-1.41 0 .996.996 0 0 0 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36a.996.996 0 0 0 0-1.41.996.996 0 0 0-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z" />
              </svg>
            )}
          </button>

          <button
            className={`${styles.iconBtn} ${isInfoOpen ? styles.active : ''}`}
            onClick={() => setIsInfoOpen(!isInfoOpen)}
            title="System Info"
            aria-label="Toggle system info"
          >
            <svg viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </button>
        </div>
      </header>

      {isInfoOpen && (
        <div className={styles.floatingPanel}>
          <div className={styles.panelInner}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsInfoOpen(false)}
              aria-label="Close panel"
            >
              ✕
            </button>

            <h2 className={styles.panelTitle}>What Should I Do Now</h2>
            
            <p className={styles.description}>
              What Should I Do Now aligns your present moment with the optimal focus, energy, and activity for right now based on ancient wisdom.
            </p>

            <div className={styles.attribution}>
              Curated by <a href="https://alexseif.com" target="_blank" rel="noopener noreferrer">Alex Seif</a>.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
