// ПРАКТИКА 26: Material-UI компоненты - Карточка технологии
// Компонент демонстрирует использование готовых компонентов Material-UI
// Material-UI предоставляет готовые компоненты с Material Design стилями
// ПРИМЕЧАНИЕ: Для работы этого компонента необходимо установить Material-UI
// npm install @mui/material @emotion/react @emotion/styled @mui/icons-material

import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box
} from '@mui/material';

// НОВОВВЕДЕНИЕ: Компонент карточки технологии с использованием Material-UI
// Material-UI компоненты имеют встроенные стили и следуют принципам Material Design
function SimpleTechCard({ technology, onStatusChange }) {
  // НОВОВВЕДЕНИЕ: Функция определения цвета чипа в зависимости от статуса
  // Material-UI предоставляет предопределенные цвета: success, warning, error, info, default
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in-progress': return 'warning';
      default: return 'default';
    }
  };

  // НОВОВВЕДЕНИЕ: Функция получения текста статуса на русском языке
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      default: return 'Не начато';
    }
  };

  return (
    // НОВОВВЕДЕНИЕ: Компонент Card - карточка с тенью и скругленными углами
    // sx prop позволяет задавать стили через объект (система стилизации MUI)
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardContent>
        {/* НОВОВВЕДЕНИЕ: Typography - компонент для текста с предустановленными стилями
            variant="h5" задает размер и вес шрифта
            component="h2" определяет HTML-тег для семантики
            gutterBottom добавляет отступ снизу */}
        <Typography variant="h5" component="h2" gutterBottom>
          {technology.title}
        </Typography>

        {/* НОВОВВЕДЕНИЕ: Описание технологии с вторичным цветом текста */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {technology.description}
        </Typography>

        {/* НОВОВВЕДЕНИЕ: Box - универсальный контейнер для flex/grid раскладок
            sx={{ display: 'flex', gap: 1 }} создает flex-контейнер с отступами между элементами */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {/* НОВОВВЕДЕНИЕ: Chip - маленький компонент-метка для категорий и статусов
              variant="outlined" создает обведенный стиль
              size="small" делает чип компактным */}
          <Chip
            label={technology.category}
            variant="outlined"
            size="small"
          />
          <Chip
            label={getStatusText(technology.status)}
            color={getStatusColor(technology.status)}
            size="small"
          />
        </Box>
      </CardContent>

      {/* НОВОВВЕДЕНИЕ: CardActions - область для кнопок действий внизу карточки */}
      <CardActions>
        {/* НОВОВВЕДЕНИЕ: Условный рендеринг кнопки "Завершить" */}
        {technology.status !== 'completed' && (
          <Button
            size="small"
            variant="contained"
            onClick={() => onStatusChange(technology.id, 'completed')}
          >
            Завершить
          </Button>
        )}

        {/* НОВОВВЕДЕНИЕ: Button - кнопка с различными вариантами стилей
            variant="contained" - заполненная кнопка (главное действие)
            variant="outlined" - обведенная кнопка (второстепенное действие)
            size="small" - компактный размер */}
        <Button
          size="small"
          variant="outlined"
          onClick={() => onStatusChange(
            technology.id,
            technology.status === 'in-progress' ? 'not-started' : 'in-progress'
          )}
        >
          {technology.status === 'in-progress' ? 'Приостановить' : 'Начать'}
        </Button>
      </CardActions>
    </Card>
  );
}

export default SimpleTechCard;

