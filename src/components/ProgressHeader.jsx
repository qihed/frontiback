// ПРАКТИКА 19: Компонент статистики прогресса изучения технологий
// Самостоятельная работа - показывает общую статистику по дорожной карте

import './ProgressHeader.css';

function ProgressHeader({ technologies = [] }) {
  // НОВОВВЕДЕНИЕ: Подсчет статистики по статусам
  const stats = {
    total: technologies.length,
    completed: technologies.filter(tech => tech.status === 'completed').length,
    inProgress: technologies.filter(tech => tech.status === 'in-progress').length,
    notStarted: technologies.filter(tech => tech.status === 'not-started').length,
  };

  // НОВОВВЕДЕНИЕ: Расчет общего прогресса в процентах
  const overallProgress = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  // НОВОВВЕДЕНИЕ: Расчет прогресса по категориям
  const categoryStats = {};
  technologies.forEach(tech => {
    if (tech.category) {
      if (!categoryStats[tech.category]) {
        categoryStats[tech.category] = { total: 0, completed: 0 };
      }
      categoryStats[tech.category].total++;
      if (tech.status === 'completed') {
        categoryStats[tech.category].completed++;
      }
    }
  });

  return (
    <div className="progress-header">
      <h2 className="progress-title">📊 Статистика изучения технологий</h2>
      
      {/* НОВОВВЕДЕНИЕ: Общая статистика */}
      <div className="stats-overview">
        <div className="stat-card stat-total">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-card stat-completed">
          <div className="stat-value">{stats.completed}</div>
          <div className="stat-label">Завершено</div>
        </div>
        
        <div className="stat-card stat-in-progress">
          <div className="stat-value">{stats.inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-card stat-not-started">
          <div className="stat-value">{stats.notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>

      {/* НОВОВВЕДЕНИЕ: Общий прогресс */}
      <div className="overall-progress">
        <div className="progress-label">
          <span>Общий прогресс</span>
          <span className="progress-percentage">{overallProgress}%</span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>

      {/* НОВОВВЕДЕНИЕ: Прогресс по категориям */}
      {Object.keys(categoryStats).length > 0 && (
        <div className="category-progress">
          <h3 className="category-title">Прогресс по категориям</h3>
          <div className="category-list">
            {Object.entries(categoryStats).map(([category, data]) => {
              const categoryProgress = data.total > 0 
                ? Math.round((data.completed / data.total) * 100) 
                : 0;
              
              return (
                <div key={category} className="category-item">
                  <div className="category-header">
                    <span className="category-name">{category}</span>
                    <span className="category-stats">
                      {data.completed}/{data.total} ({categoryProgress}%)
                    </span>
                  </div>
                  <div className="category-progress-bar">
                    <div 
                      className="category-progress-fill"
                      style={{ width: `${categoryProgress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProgressHeader;

