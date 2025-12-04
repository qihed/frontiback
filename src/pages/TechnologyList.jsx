// ПРАКТИКА 23: Страница TechnologyList - список всех технологий

import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyCard from '../components/TechnologyCard';
import ProgressHeader from '../components/ProgressHeader';
import QuickActions from '../components/QuickActions';
import ProgressBar from '../components/ProgressBar';
import TechnologyNotes from '../components/TechnologyNotes';
import RoadmapImporter from '../components/RoadmapImporter';
import TechnologyDialog from '../components/TechnologyDialog';
import NotificationSnackbar, { useNotification } from '../components/NotificationSnackbar';
import BulkStatusEditor from '../components/BulkStatusEditor';
import DeadlineForm from '../components/DeadlineForm';
import DataImportExport from '../DataImportExport';
import { useState } from 'react';
import './TechnologyList.css';

function TechnologyList() {
  const {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    updateAllTechnologies,
    progress
  } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Обработчик установки дедлайна (Практика 25)
  const handleDeadlineSet = (techId, deadline) => {
    const updatedTechs = technologies.map(tech =>
      tech.id === techId ? { ...tech, deadline } : tech
    );
    updateAllTechnologies(updatedTechs);
    const tech = technologies.find(t => t.id === techId);
    showSuccess(`Дедлайн для "${tech?.title}" установлен на ${new Date(deadline).toLocaleDateString('ru-RU')}`);
  };

  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTech, setSelectedTech] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTech, setEditingTech] = useState(null);
  
  // НОВОВВЕДЕНИЕ: Использование хука уведомлений (Практика 26)
  const { notification, showSuccess, showError, hideNotification } = useNotification();

  const filteredTechnologies = technologies.filter(tech => {
    if (statusFilter === 'all') return true;
    return tech.status === statusFilter;
  });

  const handleUpdateAll = (updatedTechs) => {
    updateAllTechnologies(updatedTechs);
  };

  const handleResetAll = (resetTechs) => {
    updateAllTechnologies(resetTechs);
  };

  const handleRandomSelect = (tech) => {
    setSelectedTech(tech);
    setTimeout(() => setSelectedTech(null), 3000);
  };

  return (
    <div className="technology-list-page">
      <div className="page-header">
        <h1>📚 Список технологий</h1>
        <button 
          onClick={() => {
            setEditingTech(null);
            setDialogOpen(true);
          }}
          className="add-button"
        >
          ➕ Добавить технологию
        </button>
      </div>

      <ProgressHeader technologies={technologies} />

      <div className="tracker-progress-section">
        <ProgressBar 
          progress={progress} 
          label="Общий прогресс изучения"
          color="#667eea"
          height={25}
        />
      </div>

      <QuickActions
        technologies={technologies}
        onUpdateAll={handleUpdateAll}
        onResetAll={handleResetAll}
        onRandomSelect={handleRandomSelect}
      />

      {/* НОВОВВЕДЕНИЕ: RoadmapImporter - импорт технологий из библиотеки (Практика 24) */}
      <RoadmapImporter 
        onImport={(tech) => {
          addTechnology(tech);
          showSuccess(`Технология "${tech.title}" добавлена в трекер`);
        }} 
      />

      {/* НОВОВВЕДЕНИЕ: BulkStatusEditor - массовое редактирование статусов (Практика 25) */}
      <BulkStatusEditor
        technologies={technologies}
        onBulkUpdate={(ids, newStatus) => {
          const updatedTechs = technologies.map(tech =>
            ids.includes(tech.id) ? { ...tech, status: newStatus } : tech
          );
          updateAllTechnologies(updatedTechs);
          showSuccess(`Статус ${ids.length} технологий изменен на "${newStatus === 'completed' ? 'Завершено' : newStatus === 'in-progress' ? 'В процессе' : 'Не начато'}"`);
        }}
      />

      {/* НОВОВВЕДЕНИЕ: DeadlineForm - форма установки сроков изучения (Практика 25) */}
      <DeadlineForm
        technologies={technologies}
        onDeadlineSet={handleDeadlineSet}
      />

      {/* НОВОВВЕДЕНИЕ: DataImportExport - импорт/экспорт данных (Практика 25) */}
      <DataImportExport />

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

      <div className="technologies-grid">
        {filteredTechnologies.length === 0 ? (
          <div className="no-technologies">
            <p>Нет технологий для отображения</p>
            <Link to="/technologies/add" className="add-link">
              Добавить первую технологию
            </Link>
          </div>
        ) : (
          filteredTechnologies.map(tech => (
            <div 
              key={tech.id} 
              className={`tech-card-wrapper ${selectedTech?.id === tech.id ? 'selected' : ''}`}
            >
              <div className="tech-card-actions">
                <Link to={`/technologies/${tech.id}`} className="tech-link">
                  <TechnologyCard
                    technology={tech}
                    onStatusChange={(id, newStatus) => {
                      updateStatus(id, newStatus);
                      showSuccess(`Статус технологии "${tech.title}" изменен`);
                    }}
                  />
                </Link>
                <button
                  className="edit-tech-button"
                  onClick={() => {
                    setEditingTech(tech);
                    setDialogOpen(true);
                  }}
                  title="Редактировать"
                >
                  ✏️
                </button>
              </div>
              <TechnologyNotes
                technology={tech}
                onNotesChange={updateNotes}
              />
            </div>
          ))
        )}
      </div>

      {/* НОВОВВЕДЕНИЕ: Material-UI Dialog для создания/редактирования (Практика 26) */}
      <TechnologyDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingTech(null);
        }}
        initialData={editingTech}
        onSubmit={(formData) => {
          if (editingTech) {
            // Редактирование существующей технологии
            const updatedTechs = technologies.map(tech =>
              tech.id === editingTech.id ? { ...tech, ...formData } : tech
            );
            updateAllTechnologies(updatedTechs);
            showSuccess(`Технология "${formData.title}" обновлена`);
          } else {
            // Добавление новой технологии
            addTechnology(formData);
            showSuccess(`Технология "${formData.title}" добавлена`);
          }
        }}
      />

      {/* НОВОВВЕДЕНИЕ: Snackbar для уведомлений (Практика 26) */}
      <NotificationSnackbar
        message={notification.message}
        type={notification.type}
        open={notification.open}
        onClose={hideNotification}
      />
    </div>
  );
}

export default TechnologyList;

