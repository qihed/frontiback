// ПРАКТИКА 24: Условный рендеринг и фильтрация данных
// Компонент демонстрирует фильтрацию и условный рендеринг списка технологий
// Показывает различные способы условного отображения контента

import { useState } from 'react';

function TechnologyFilter() {
  // НОВОВВЕДЕНИЕ: Исходный массив данных с технологиями
  const [technologies] = useState([
    { id: 1, name: 'React', category: 'frontend', difficulty: 'medium', status: 'in-progress' },
    { id: 2, name: 'Node.js', category: 'backend', difficulty: 'medium', status: 'completed' },
    { id: 3, name: 'Vue.js', category: 'frontend', difficulty: 'easy', status: 'not-started' },
    { id: 4, name: 'MongoDB', category: 'database', difficulty: 'hard', status: 'completed' },
    { id: 5, name: 'Express', category: 'backend', difficulty: 'medium', status: 'in-progress' },
    { id: 6, name: 'PostgreSQL', category: 'database', difficulty: 'hard', status: 'not-started' },
    { id: 7, name: 'TypeScript', category: 'frontend', difficulty: 'medium', status: 'completed' },
    { id: 8, name: 'Docker', category: 'devops', difficulty: 'hard', status: 'not-started' },
  ]);

  // НОВОВВЕДЕНИЕ: Состояния для фильтров
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // НОВОВВЕДЕНИЕ: Функция фильтрации технологий по всем критериям
  const filteredTechnologies = technologies.filter(tech => {
    // Фильтр по категории
    const categoryMatch = selectedCategory === 'all' || tech.category === selectedCategory;
    
    // Фильтр по сложности
    const difficultyMatch = selectedDifficulty === 'all' || tech.difficulty === selectedDifficulty;
    
    // Фильтр по статусу
    const statusMatch = selectedStatus === 'all' || tech.status === selectedStatus;
    
    // НОВОВВЕДЕНИЕ: Поиск по названию (регистронезависимый)
    const searchMatch = tech.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && difficultyMatch && statusMatch && searchMatch;
  });

  // НОВОВВЕДЕНИЕ: Получение уникальных категорий из массива
  const categories = ['all', ...new Set(technologies.map(tech => tech.category))];

  // НОВОВВЕДЕНИЕ: Функция получения цвета статуса
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4caf50';
      case 'in-progress': return '#ff9800';
      case 'not-started': return '#9e9e9e';
      default: return '#000';
    }
  };

  // НОВОВВЕДЕНИЕ: Функция получения текста статуса на русском
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return status;
    }
  };

  // НОВОВВЕДЕНИЕ: Функция получения текста сложности на русском
  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'Легкая';
      case 'medium': return 'Средняя';
      case 'hard': return 'Сложная';
      default: return difficulty;
    }
  };

  return (
    <div className="technology-filter">
      <h2>Фильтр технологий (Практика 24)</h2>
      
      {/* НОВОВВЕДЕНИЕ: Панель фильтров */}
      <div className="filter-panel">
        <div className="filter-group">
          <label htmlFor="category-filter">Категория:</label>
          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">Все категории</option>
            {categories.slice(1).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="difficulty-filter">Сложность:</label>
          <select
            id="difficulty-filter"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            <option value="all">Любая</option>
            <option value="easy">Легкая</option>
            <option value="medium">Средняя</option>
            <option value="hard">Сложная</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Статус:</label>
          <select
            id="status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="completed">Завершено</option>
            <option value="in-progress">В процессе</option>
            <option value="not-started">Не начато</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="search-input">Поиск:</label>
          <input
            id="search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Поиск по названию..."
          />
        </div>
      </div>

      {/* НОВОВВЕДЕНИЕ: Статистика фильтрации */}
      <div className="filter-stats">
        <p>
          Показано: <strong>{filteredTechnologies.length}</strong> из <strong>{technologies.length}</strong> технологий
        </p>
      </div>

      {/* НОВОВВЕДЕНИЕ: Условный рендеринг: сообщение если ничего не найдено */}
      {filteredTechnologies.length === 0 ? (
        <div className="no-results">
          <p>😔 Технологии не найдены. Попробуйте изменить фильтры.</p>
        </div>
      ) : (
        <div className="technologies-grid">
          {/* НОВОВВЕДЕНИЕ: Рендеринг отфильтрованного списка */}
          {filteredTechnologies.map(tech => (
            <div key={tech.id} className="tech-card">
              <h3>{tech.name}</h3>
              <div className="tech-info">
                <span className="tech-category">{tech.category}</span>
                <span className="tech-difficulty">
                  {getDifficultyText(tech.difficulty)}
                </span>
              </div>
              {/* НОВОВВЕДЕНИЕ: Условный рендеринг статуса с цветом */}
              <div
                className="tech-status"
                style={{ backgroundColor: getStatusColor(tech.status) }}
              >
                {getStatusText(tech.status)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Кнопка сброса всех фильтров */}
      <div className="filter-actions">
        <button
          onClick={() => {
            setSelectedCategory('all');
            setSelectedDifficulty('all');
            setSelectedStatus('all');
            setSearchQuery('');
          }}
          className="reset-filters-button"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>
  );
}

export default TechnologyFilter;


