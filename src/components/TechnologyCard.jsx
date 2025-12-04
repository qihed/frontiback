// ПРАКТИКА 19: Компонент карточки технологии для трекера изучения технологий
// Компонент отображает информацию о технологии с различным визуальным видом по статусам

import './TechnologyCard.css';

function TechnologyCard({ technology, onStatusChange }) {
  // НОВОВВЕДЕНИЕ: Функция получения класса статуса для стилизации
  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'in-progress': return 'status-in-progress';
      case 'not-started': return 'status-not-started';
      default: return 'status-default';
    }
  };

  // НОВОВВЕДЕНИЕ: Функция получения текста статуса на русском языке
  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'not-started': return 'Не начато';
      default: return status;
    }
  };

  // НОВОВВЕДЕНИЕ: Функция получения иконки статуса
  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return '✅';
      case 'in-progress': return '⏳';
      case 'not-started': return '📋';
      default: return '❓';
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения статуса
  const handleStatusClick = () => {
    if (!onStatusChange) return;
    
    // Циклическое переключение статусов: not-started -> in-progress -> completed -> not-started
    const statusOrder = ['not-started', 'in-progress', 'completed'];
    const currentIndex = statusOrder.indexOf(technology.status);
    const nextIndex = (currentIndex + 1) % statusOrder.length;
    const newStatus = statusOrder[nextIndex];
    
    onStatusChange(technology.id, newStatus);
  };

  return (
    <div className={`technology-card ${getStatusClass(technology.status)}`}>
      <div className="tech-card-header">
        <h3 className="tech-title">{technology.title}</h3>
        <span className="tech-status-icon">{getStatusIcon(technology.status)}</span>
      </div>
      
      {technology.description && (
        <p className="tech-description">{technology.description}</p>
      )}
      
      {technology.category && (
        <div className="tech-category">
          <span className="category-label">Категория:</span>
          <span className="category-value">{technology.category}</span>
        </div>
      )}

      {technology.difficulty && (
        <div className="tech-difficulty">
          <span className="difficulty-label">Сложность:</span>
          <span className={`difficulty-value difficulty-${technology.difficulty}`}>
            {technology.difficulty === 'easy' ? 'Легкая' : 
             technology.difficulty === 'medium' ? 'Средняя' : 'Сложная'}
          </span>
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Отображение дедлайна если он установлен (Практика 25) */}
      {technology.deadline && (
        <div className="tech-deadline">
          <span className="deadline-label">📅 Дедлайн:</span>
          <span className="deadline-value">
            {new Date(technology.deadline).toLocaleDateString('ru-RU')}
          </span>
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Отображение ресурсов если они есть (Практика 25) */}
      {technology.resources && technology.resources.length > 0 && (
        <div className="tech-resources">
          <span className="resources-label">🔗 Ресурсы:</span>
          <div className="resources-list">
            {technology.resources.slice(0, 2).map((resource, index) => (
              <a 
                key={index}
                href={resource} 
                target="_blank" 
                rel="noopener noreferrer"
                className="resource-link"
              >
                {resource.length > 30 ? resource.substring(0, 30) + '...' : resource}
              </a>
            ))}
            {technology.resources.length > 2 && (
              <span className="resources-more">+{technology.resources.length - 2} еще</span>
            )}
          </div>
        </div>
      )}

      <div className="tech-card-footer">
        <button 
          className={`status-button ${getStatusClass(technology.status)}`}
          onClick={handleStatusClick}
          aria-label={`Изменить статус на ${getStatusText(technology.status)}`}
        >
          {getStatusIcon(technology.status)} {getStatusText(technology.status)}
        </button>
      </div>
    </div>
  );
}

export default TechnologyCard;

