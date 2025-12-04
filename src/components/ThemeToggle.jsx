// ПРАКТИКА 26: Переключатель светлой/тёмной темы Material-UI
// Самостоятельная работа - сохранение выбора темы в localStorage

import React from 'react';
import {
  IconButton,
  Tooltip
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

/**
 * НОВОВВЕДЕНИЕ: Компонент переключателя темы Material-UI
 * Сохраняет выбранную тему в localStorage для сохранения предпочтений пользователя
 * 
 * @param {string} mode - Текущий режим темы: 'light' или 'dark'
 * @param {function} toggleTheme - Функция переключения темы
 */
function ThemeToggle({ mode, toggleTheme }) {
  return (
    <Tooltip title={mode === 'light' ? 'Переключить на тёмную тему' : 'Переключить на светлую тему'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        aria-label="переключить тему"
        sx={{
          ml: 1,
          transition: 'transform 0.2s',
          '&:hover': {
            transform: 'rotate(20deg)'
          }
        }}
      >
        {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;

