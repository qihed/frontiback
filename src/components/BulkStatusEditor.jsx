// ПРАКТИКА 25: Компонент массового редактирования статусов технологий
// Самостоятельная работа - позволяет выбрать несколько технологий и изменить их статус

import { useState } from 'react';
import './BulkStatusEditor.css';

function BulkStatusEditor({ technologies = [], onBulkUpdate }) {
  // НОВОВВЕДЕНИЕ: Состояние выбранных технологий (массив ID)
  const [selectedIds, setSelectedIds] = useState([]);
  const [newStatus, setNewStatus] = useState('in-progress');
  const [isExpanded, setIsExpanded] = useState(false);

  // НОВОВВЕДЕНИЕ: Обработчик выбора/снятия выбора технологии
  const handleToggleSelect = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // НОВОВВЕДЕНИЕ: Обработчик выбора всех технологий
  const handleSelectAll = () => {
    if (selectedIds.length === technologies.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(technologies.map(tech => tech.id));
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик применения массового изменения статуса
  const handleApplyStatus = () => {
    if (selectedIds.length === 0) {
      alert('Выберите хотя бы одну технологию');
      return;
    }

    if (onBulkUpdate) {
      onBulkUpdate(selectedIds, newStatus);
    }

    setSelectedIds([]);
    setIsExpanded(false);
  };

  // НОВОВВЕДЕНИЕ: Получение названий выбранных технологий
  const selectedTechs = technologies.filter(tech => selectedIds.includes(tech.id));

  return (
    <div className="bulk-status-editor">
      <div className="bulk-header">
        <h3>⚙️ Массовое редактирование статусов</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="expand-button"
        >
          {isExpanded ? '▼ Свернуть' : '▶ Развернуть'}
        </button>
      </div>

      {isExpanded && (
        <div className="bulk-content">
          <div className="bulk-controls">
            <div className="select-all-section">
              <button
                onClick={handleSelectAll}
                className="select-all-button"
              >
                {selectedIds.length === technologies.length ? '❌ Снять все' : '✅ Выбрать все'}
              </button>
              <span className="selected-count">
                Выбрано: {selectedIds.length} из {technologies.length}
              </span>
            </div>

            <div className="status-select-section">
              <label htmlFor="bulk-status-select">
                Новый статус для выбранных:
              </label>
              <select
                id="bulk-status-select"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="status-select"
              >
                <option value="not-started">Не начато</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
              </select>
            </div>

            <button
              onClick={handleApplyStatus}
              disabled={selectedIds.length === 0}
              className="apply-button"
            >
              ✅ Применить к выбранным ({selectedIds.length})
            </button>
          </div>

          {selectedTechs.length > 0 && (
            <div className="selected-preview">
              <p className="preview-title">Выбранные технологии:</p>
              <div className="selected-list">
                {selectedTechs.map(tech => (
                  <span key={tech.id} className="selected-item">
                    {tech.title}
                    <button
                      onClick={() => handleToggleSelect(tech.id)}
                      className="remove-selected"
                      aria-label={`Убрать ${tech.title} из выбора`}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="technologies-checklist">
            {technologies.map(tech => {
              const isSelected = selectedIds.includes(tech.id);
              
              return (
                <label
                  key={tech.id}
                  className={`tech-checkbox-item ${isSelected ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleToggleSelect(tech.id)}
                    className="tech-checkbox-input"
                    aria-label={`Выбрать ${tech.title}`}
                  />
                  <span className="tech-checkbox-label">
                    <strong>{tech.title}</strong>
                    <span className="current-status">
                      (Текущий статус: {
                        tech.status === 'completed' ? 'Завершено' :
                        tech.status === 'in-progress' ? 'В процессе' : 'Не начато'
                      })
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default BulkStatusEditor;

