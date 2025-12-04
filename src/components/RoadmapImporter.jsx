// ПРАКТИКА 24: Компонент RoadmapImporter - импорт технологий из API/мока
// Позволяет добавить выбранные технологии в основной трекер

import { useState } from 'react';
import useApi from '../hooks/useApi';
import './RoadmapImporter.css';

function RoadmapImporter({ onImport }) {
  // НОВОВВЕДЕНИЕ: Мок-данные технологий для импорта
  // В реальном приложении это могло бы быть API
  const mockTechnologies = [
    {
      id: 101,
      title: 'TypeScript',
      description: 'Типизированный надмножество JavaScript',
      category: 'frontend',
      difficulty: 'medium',
      status: 'not-started'
    },
    {
      id: 102,
      title: 'GraphQL',
      description: 'Язык запросов для API',
      category: 'backend',
      difficulty: 'hard',
      status: 'not-started'
    },
    {
      id: 103,
      title: 'Docker',
      description: 'Платформа для контейнеризации приложений',
      category: 'devops',
      difficulty: 'hard',
      status: 'not-started'
    },
    {
      id: 104,
      title: 'Redis',
      description: 'In-memory структура данных',
      category: 'database',
      difficulty: 'medium',
      status: 'not-started'
    },
    {
      id: 105,
      title: 'Next.js',
      description: 'React фреймворк для продакшена',
      category: 'frontend',
      difficulty: 'medium',
      status: 'not-started'
    },
  ];

  const [selectedTechs, setSelectedTechs] = useState([]);
  const [imported, setImported] = useState(false);

  // НОВОВВЕДЕНИЕ: Обработчик выбора/снятия выбора технологии
  const handleToggleTech = (tech) => {
    setSelectedTechs(prev => {
      const isSelected = prev.some(t => t.id === tech.id);
      if (isSelected) {
        return prev.filter(t => t.id !== tech.id);
      } else {
        return [...prev, tech];
      }
    });
  };

  // НОВОВВЕДЕНИЕ: Обработчик выбора всех технологий
  const handleSelectAll = () => {
    if (selectedTechs.length === mockTechnologies.length) {
      setSelectedTechs([]);
    } else {
      setSelectedTechs([...mockTechnologies]);
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик импорта выбранных технологий
  const handleImport = () => {
    if (selectedTechs.length === 0) {
      alert('Выберите хотя бы одну технологию для импорта');
      return;
    }

    // НОВОВВЕДЕНИЕ: Вызов функции onImport для добавления технологий в трекер
    if (onImport) {
      selectedTechs.forEach(tech => {
        onImport(tech);
      });
    }

    setImported(true);
    setSelectedTechs([]);
    
    setTimeout(() => {
      setImported(false);
    }, 3000);
  };

  return (
    <div className="roadmap-importer">
      <h2>📥 Импорт технологий из библиотеки</h2>
      <p className="importer-description">
        Выберите технологии из библиотеки для добавления в ваш трекер
      </p>

      {imported && (
        <div className="import-success">
          ✅ Технологии успешно импортированы в трекер!
        </div>
      )}

      <div className="importer-actions">
        <button 
          onClick={handleSelectAll}
          className="select-all-button"
        >
          {selectedTechs.length === mockTechnologies.length ? '❌ Снять все' : '✅ Выбрать все'}
        </button>
        <button 
          onClick={handleImport}
          disabled={selectedTechs.length === 0}
          className="import-button"
        >
          📥 Импортировать выбранные ({selectedTechs.length})
        </button>
      </div>

      <div className="technologies-library">
        {mockTechnologies.map(tech => {
          const isSelected = selectedTechs.some(t => t.id === tech.id);
          
          return (
            <div 
              key={tech.id}
              className={`library-tech-card ${isSelected ? 'selected' : ''}`}
              onClick={() => handleToggleTech(tech)}
            >
              <div className="tech-checkbox">
                {isSelected ? '✅' : '☐'}
              </div>
              
              <div className="tech-content">
                <h3>{tech.title}</h3>
                <p className="tech-desc">{tech.description}</p>
                <div className="tech-meta">
                  <span className="tech-category">{tech.category}</span>
                  <span className={`tech-difficulty difficulty-${tech.difficulty}`}>
                    {tech.difficulty === 'easy' ? 'Легкая' : 
                     tech.difficulty === 'medium' ? 'Средняя' : 'Сложная'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapImporter;

