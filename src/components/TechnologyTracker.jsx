// ПРАКТИКА 19-22: Основной компонент трекера технологий
// Интегрирует все компоненты трекера: TechnologyCard, ProgressHeader, QuickActions, ProgressBar

import { useState } from 'react';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyCard from './TechnologyCard';
import ProgressHeader from './ProgressHeader';
import QuickActions from './QuickActions';
import ProgressBar from './ProgressBar';
import TechnologyNotes from './TechnologyNotes';
import RegistrationForm from './RegistrationForm';
import './TechnologyTracker.css';

function TechnologyTracker() {
  // НОВОВВЕДЕНИЕ: Использование кастомного хука useTechnologies
  // Автоматически сохраняет данные в localStorage
  const {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    deleteTechnology,
    updateAllTechnologies,
    progress
  } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Состояние для фильтрации по статусу
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);

  // НОВОВВЕДЕНИЕ: Фильтрация технологий по статусу
  const filteredTechnologies = technologies.filter(tech => {
    if (statusFilter === 'all') return true;
    return tech.status === statusFilter;
  });

  // НОВОВВЕДЕНИЕ: Обработчик массового обновления всех технологий
  const handleUpdateAll = (updatedTechs) => {
    updateAllTechnologies(updatedTechs);
  };

  // НОВОВВЕДЕНИЕ: Обработчик сброса всех статусов
  const handleResetAll = (resetTechs) => {
    updateAllTechnologies(resetTechs);
  };

  // НОВОВВЕДЕНИЕ: Обработчик случайного выбора технологии
  const handleRandomSelect = (tech) => {
    setSelectedTech(tech);
    // Можно добавить визуальное выделение выбранной технологии
    setTimeout(() => setSelectedTech(null), 3000);
  };

  return (
    <div className="technology-tracker">
      <h1 className="tracker-title">🚀 Трекер изучения технологий</h1>

      {/* НОВОВВЕДЕНИЕ: ProgressHeader - статистика по дорожной карте (Практика 19) */}
      <ProgressHeader technologies={technologies} />

      {/* НОВОВВЕДЕНИЕ: ProgressBar в шапке (Практика 22) */}
      <div className="tracker-progress-section">
        <ProgressBar 
          progress={progress} 
          label="Общий прогресс изучения"
          color="#667eea"
          height={25}
        />
      </div>

      {/* НОВОВВЕДЕНИЕ: QuickActions - быстрые действия (Практика 20) */}
      <QuickActions
        technologies={technologies}
        onUpdateAll={handleUpdateAll}
        onResetAll={handleResetAll}
        onRandomSelect={handleRandomSelect}
      />

      {/* НОВОВВЕДЕНИЕ: Фильтрация по статусу (Практика 20 - самостоятельная работа) */}
      <div className="status-filters">
        <h3>Фильтр по статусу:</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            Все ({technologies.length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'completed' ? 'active' : ''}`}
            onClick={() => setStatusFilter('completed')}
          >
            Завершено ({technologies.filter(t => t.status === 'completed').length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setStatusFilter('in-progress')}
          >
            В процессе ({technologies.filter(t => t.status === 'in-progress').length})
          </button>
          <button
            className={`filter-btn ${statusFilter === 'not-started' ? 'active' : ''}`}
            onClick={() => setStatusFilter('not-started')}
          >
            Не начато ({technologies.filter(t => t.status === 'not-started').length})
          </button>
        </div>
      </div>

      {/* НОВОВВЕДЕНИЕ: Сетка карточек технологий */}
      <div className="technologies-grid">
        {filteredTechnologies.length === 0 ? (
          <div className="no-technologies">
            <p>Нет технологий для отображения</p>
          </div>
        ) : (
          filteredTechnologies.map(tech => (
            <div 
              key={tech.id} 
              className={`tech-card-wrapper ${selectedTech?.id === tech.id ? 'selected' : ''}`}
            >
              <TechnologyCard
                technology={tech}
                onStatusChange={updateStatus}
              />
              {/* НОВОВВЕДЕНИЕ: TechnologyNotes - заметки к технологии (Практика 21) */}
              <TechnologyNotes
                technology={tech}
                onNotesChange={updateNotes}
              />
            </div>
          ))
        )}
      </div>

      {/* НОВОВВЕДЕНИЕ: RegistrationForm (Практика 20) */}
      <div className="registration-section">
        <RegistrationForm />
      </div>
    </div>
  );
}

export default TechnologyTracker;

