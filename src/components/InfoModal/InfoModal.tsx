import React from 'react';
import styles from './InfoModal.module.scss';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <h2 className={styles.title}>Wuwei Temporal Dashboard</h2>

        <div className={styles.content}>
          <p>
            <strong>WhatShouldIDoNow</strong> provides a real-time temporal overview of current system blocks, active priorities, and temporal tag allocations within the Wuwei productivity framework.
          </p>

          <div className={styles.metaBox}>
            <p><strong>Ecosystem:</strong> Wuwei OS</p>
            <p><strong>Architecture:</strong> Micro-frontend React + TypeScript</p>
            <p><strong>Design System:</strong> Nordic Minimalist (Dark/Light Auto-Sync)</p>
          </div>
        </div>

        <div className={styles.attribution}>
          Crafted by <a href="https://alexseif.com" target="_blank" rel="noopener noreferrer">Alex Seif</a> for the Wuwei Ecosystem.
        </div>
      </div>
    </div>
  );
};
