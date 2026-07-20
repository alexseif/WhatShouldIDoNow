import React from 'react';
import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Crafted by{' '}
        <a
          href="https://alexseif.com"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Alex Seif
        </a>{' '}
        for the Wuwei Ecosystem.
      </p>
    </footer>
  );
};
