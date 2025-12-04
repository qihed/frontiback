// ПРАКТИКА 26: Material-UI компоненты - Обертка с применением темы и переключателем
// Компонент оборачивает Material-UI компоненты в ThemeProvider для применения темы
// Поддерживает переключение между светлой и тёмной темами

import React, { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeToggle from './components/ThemeToggle';

// НОВОВВЕДЕНИЕ: Создание светлой темы Material-UI
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

// НОВОВВЕДЕНИЕ: Создание тёмной темы Material-UI
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

// НОВОВВЕДЕНИЕ: Компонент-обертка для Material-UI с поддержкой переключения темы
function MaterialUIWrapper({ children }) {
  // НОВОВВЕДЕНИЕ: Состояние темы с загрузкой из localStorage
  const [themeMode, setThemeMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme || 'light';
  });

  // НОВОВВЕДЕНИЕ: Сохранение темы в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('themeMode', themeMode);
  }, [themeMode]);

  // НОВОВВЕДЕНИЕ: Функция переключения темы
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  // НОВОВВЕДЕНИЕ: Выбор темы в зависимости от режима
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <div style={{ position: 'relative' }}>
        {/* НОВОВВЕДЕНИЕ: Переключатель темы в правом верхнем углу */}
        <div style={{ 
          position: 'fixed', 
          top: '80px', 
          right: '20px', 
          zIndex: 1000,
          background: themeMode === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.9)',
          borderRadius: '50%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
        }}>
          <ThemeToggle mode={themeMode} toggleTheme={toggleTheme} />
        </div>
        {children}
      </div>
    </ThemeProvider>
  );
}

export default MaterialUIWrapper;

