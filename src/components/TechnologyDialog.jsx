// ПРАКТИКА 26: Material-UI Dialog для создания/редактирования технологии
// Модальное окно с использованием Material-UI Dialog компонента

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TechnologyForm from './TechnologyForm';

/**
 * НОВОВВЕДЕНИЕ: Компонент модального окна для создания/редактирования технологии
 * Использует Material-UI Dialog для отображения формы в модальном окне
 * 
 * @param {boolean} open - Открыто ли модальное окно
 * @param {function} onClose - Функция закрытия модального окна
 * @param {object} initialData - Начальные данные для редактирования (null для создания)
 * @param {function} onSubmit - Функция обработки отправки формы
 */
function TechnologyDialog({ open, onClose, initialData = null, onSubmit }) {
  // НОВОВВЕДЕНИЕ: Обработчик отправки формы
  const handleSubmit = (formData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
    onClose();
  };

  // НОВОВВЕДЕНИЕ: Обработчик отмены
  const handleCancel = () => {
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2
        }
      }}
    >
      {/* НОВОВВЕДЕНИЕ: Заголовок модального окна с кнопкой закрытия */}
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <span>
          {initialData ? '✏️ Редактировать технологию' : '➕ Добавить технологию'}
        </span>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* НОВОВВЕДЕНИЕ: Содержимое модального окна */}
      <DialogContent dividers>
        <TechnologyForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </DialogContent>

      {/* НОВОВВЕДЕНИЕ: Действия в модальном окне (опционально, форма сама содержит кнопки) */}
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default TechnologyDialog;

