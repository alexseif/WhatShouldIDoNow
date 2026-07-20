import React from 'react';
import { useTheme } from './hooks/useTheme';
import { Header } from './components/Header/Header';
import { DigitalClock } from './components/Clock/DigitalClock';
import { TemporalGrid } from './components/TemporalGrid/TemporalGrid';
import styles from './App.module.scss';
import './styles/main.scss';

export const App: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.appContainer}>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className={styles.mainContent}>
        <DigitalClock />
        <TemporalGrid />
      </main>
    </div>
  );
};

export default App;
