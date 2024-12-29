import React from 'react';
import { useTheme } from './ThemeContext';

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className={`app-header ${theme}`}>
      <h1>User Behavior Analytics Dashboard</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
};

