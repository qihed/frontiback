// ПРАКТИКА 26: Material-UI компоненты - Dashboard с вкладками
// Компонент демонстрирует создание панели управления с использованием Material-UI
// Показывает использование AppBar, Tabs, Grid, Card, List и других компонентов MUI

import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';

// НОВОВВЕДЕНИЕ: Компонент для содержимого вкладки
// Скрывает неактивные вкладки и рендерит только активную
function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function MaterialDashboard({ technologies = [] }) {
  // НОВОВВЕДЕНИЕ: Состояние для активной вкладки
  const [tabValue, setTabValue] = React.useState(0);
  const [notificationCount] = React.useState(3);

  // НОВОВВЕДЕНИЕ: Расчет статистики на основе массива technologies
  const stats = {
    total: technologies.length,
    completed: technologies.filter(t => t.status === 'completed').length,
    inProgress: technologies.filter(t => t.status === 'in-progress').length,
    notStarted: technologies.filter(t => t.status === 'not-started').length
  };

  // НОВОВВЕДЕНИЕ: Расчет процента выполнения
  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  // НОВОВВЕДЕНИЕ: Обработчик переключения вкладок
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* НОВОВВЕДЕНИЕ: AppBar - шапка приложения с Material Design стилями
          position="static" - статичная позиция (не фиксированная)
          elevation={1} - уровень тени */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {/* НОВОВВЕДЕНИЕ: Typography с flexGrow для растягивания заголовка */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Панель управления технологиями
          </Typography>

          {/* НОВОВВЕДЕНИЕ: IconButton с Badge для отображения уведомлений
              Badge показывает красный кружок с количеством непрочитанных уведомлений */}
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* НОВОВВЕДЕНИЕ: Tabs - система вкладок для переключения разделов
          value и onChange делают компонент контролируемым */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Обзор" />
          <Tab label="Статистика" />
        </Tabs>
      </Box>

      {/* НОВОВВЕДЕНИЕ: Вкладка обзора */}
      <TabPanel value={tabValue} index={0}>
        {/* НОВОВВЕДЕНИЕ: Grid - система сетки для адаптивной раскладки
            container создает контейнер сетки
            spacing={3} добавляет отступы между элементами
            item с брейкпоинтами: xs={12} sm={6} md={3}
            xs (мобильный): 1 карточка в строку (12/12)
            sm (планшет): 2 карточки в строку (6/12)
            md+ (десктоп): 4 карточки в строку (3/12) */}
        <Grid container spacing={3}>
          {/* НОВОВВЕДЕНИЕ: Статистические карточки */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Завершено
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon color="warning" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    В процессе
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="info" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Не начато
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.notStarted}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Общий прогресс
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {completionPercentage}%
                </Typography>
                {/* НОВОВВЕДЕНИЕ: LinearProgress - горизонтальный прогресс-бар
                    variant="determinate" показывает конкретное значение (не анимацию загрузки)
                    value передает процент (0-100)
                    sx позволяет кастомизировать стили */}
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* НОВОВВЕДЕНИЕ: Недавно добавленные технологии */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Недавно добавленные
                </Typography>
                {/* НОВОВВЕДЕНИЕ: List - компонент списка Material Design
                    ListItem - элемент списка
                    ListItemText с primary и secondary текстами */}
                <List>
                  {technologies.slice(0, 5).map((tech) => (
                    <ListItem key={tech.id}>
                      <ListItemText
                        primary={tech.title}
                        secondary={tech.category}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* НОВОВВЕДЕНИЕ: Распределение по категориям */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  По категориям
                </Typography>
                <List>
                  {['frontend', 'backend', 'database', 'ui-library', 'other'].map(category => {
                    const count = technologies.filter(t => t.category === category).length;
                    return count > 0 ? (
                      <ListItem key={category}>
                        <ListItemText
                          primary={category}
                          secondary={`${count} технологий`}
                        />
                      </ListItem>
                    ) : null;
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* НОВОВВЕДЕНИЕ: Вкладка статистики */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom>
          Детальная статистика
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Общая информация
                </Typography>
                <Typography>Всего технологий: {stats.total}</Typography>
                <Typography>Завершено: {stats.completed}</Typography>
                <Typography>В процессе: {stats.inProgress}</Typography>
                <Typography>Не начато: {stats.notStarted}</Typography>
                <Typography sx={{ mt: 2 }}>
                  Процент выполнения: {completionPercentage}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default MaterialDashboard;

