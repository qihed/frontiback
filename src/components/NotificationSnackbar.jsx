// ПРАКТИКА 26: Компонент уведомлений на основе Snackbar из Material-UI
// Самостоятельная работа - различные типы уведомлений с автоматическим закрытием

import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

/**
 * НОВОВВЕДЕНИЕ: Компонент уведомлений с использованием Material-UI Snackbar
 * Поддерживает различные типы уведомлений: success, error, warning, info
 * 
 * @param {string} message - Текст сообщения
 * @param {string} type - Тип уведомления: 'success', 'error', 'warning', 'info'
 * @param {boolean} open - Открыто ли уведомление
 * @param {function} onClose - Функция закрытия уведомления
 * @param {number} autoHideDuration - Длительность автоматического закрытия в мс (по умолчанию 6000)
 */
function NotificationSnackbar({ 
  message = '', 
  type = 'info', 
  open = false, 
  onClose,
  autoHideDuration = 6000 
}) {
  const [isOpen, setIsOpen] = useState(open);

  // НОВОВВЕДЕНИЕ: Синхронизация состояния с пропсом open
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // НОВОВВЕДЕНИЕ: Обработчик закрытия уведомления
  const handleClose = (event, reason) => {
    // НОВОВВЕДЕНИЕ: Предотвращаем закрытие при клике вне области
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
    if (onClose) {
      onClose();
    }
  };

  // НОВОВВЕДЕНИЕ: Получение иконки для типа уведомления
  const getIcon = () => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return 'ℹ️';
    }
  };

  if (!message) return null;

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={type}
        variant="filled"
        sx={{ width: '100%' }}
        icon={false} // НОВОВВЕДЕНИЕ: Используем кастомную иконку
      >
        <span style={{ marginRight: '8px' }}>{getIcon()}</span>
        {message}
      </Alert>
    </Snackbar>
  );
}

/**
 * НОВОВВЕДЕНИЕ: Хук для управления уведомлениями
 * Упрощает использование NotificationSnackbar в компонентах
 */
export function useNotification() {
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    open: false
  });

  // НОВОВВЕДЕНИЕ: Функция показа уведомления
  const showNotification = (message, type = 'info') => {
    setNotification({
      message,
      type,
      open: true
    });
  };

  // НОВОВВЕДЕНИЕ: Функция закрытия уведомления
  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // НОВОВВЕДЕНИЕ: Удобные функции для разных типов уведомлений
  const showSuccess = (message) => showNotification(message, 'success');
  const showError = (message) => showNotification(message, 'error');
  const showWarning = (message) => showNotification(message, 'warning');
  const showInfo = (message) => showNotification(message, 'info');

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };
}

export default NotificationSnackbar;

