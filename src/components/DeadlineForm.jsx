// ПРАКТИКА 25: Форма установки сроков изучения с валидацией
// Самостоятельная работа - форма с real-time валидацией и ARIA-атрибутами

import { useState, useEffect } from 'react';
import './DeadlineForm.css';

function DeadlineForm({ technologies = [], onDeadlineSet }) {
  // НОВОВВЕДЕНИЕ: Состояние формы
  const [selectedTechId, setSelectedTechId] = useState('');
  const [deadline, setDeadline] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // НОВОВВЕДЕНИЕ: Real-time валидация при изменении полей
  useEffect(() => {
    validateForm();
  }, [selectedTechId, deadline]);

  // НОВОВВЕДЕНИЕ: Функция валидации формы в реальном времени
  const validateForm = () => {
    const newErrors = {};

    // Валидация выбора технологии
    if (!selectedTechId) {
      newErrors.techId = 'Выберите технологию';
    }

    // НОВОВВЕДЕНИЕ: Валидация дедлайна - не должен быть в прошлом
    if (!deadline) {
      newErrors.deadline = 'Установите дедлайн';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // НОВОВВЕДЕНИЕ: Обнуление времени для сравнения только дат
      
      const deadlineDate = new Date(deadline);
      deadlineDate.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && selectedTechId && deadline);
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения технологии
  const handleTechChange = (e) => {
    setSelectedTechId(e.target.value);
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения дедлайна
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isValid) {
      return;
    }

    if (onDeadlineSet) {
      onDeadlineSet(Number(selectedTechId), deadline);
    }

    // НОВОВВЕДЕНИЕ: Сброс формы после успешной отправки
    setSelectedTechId('');
    setDeadline('');
    setErrors({});
    setIsValid(false);
  };

  // НОВОВВЕДЕНИЕ: Получение минимальной даты (сегодня)
  const minDate = new Date().toISOString().split('T')[0];

  // НОВОВВЕДЕНИЕ: Получение выбранной технологии для отображения информации
  const selectedTech = technologies.find(tech => tech.id === Number(selectedTechId));

  return (
    <div className="deadline-form">
      <h3>📅 Установка сроков изучения (Практика 25)</h3>
      <p className="form-description">
        Установите дедлайн изучения для технологии с валидацией в реальном времени
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="tech-select">
            Выберите технологию <span className="required">*</span>
          </label>
          <select
            id="tech-select"
            name="techId"
            value={selectedTechId}
            onChange={handleTechChange}
            className={errors.techId ? 'error' : ''}
            aria-invalid={!!errors.techId}
            aria-describedby={errors.techId ? 'tech-error' : undefined}
            aria-required="true"
          >
            <option value="">-- Выберите технологию --</option>
            {technologies.map(tech => (
              <option key={tech.id} value={tech.id}>
                {tech.title} ({tech.status === 'completed' ? 'Завершено' : 
                              tech.status === 'in-progress' ? 'В процессе' : 'Не начато'})
              </option>
            ))}
          </select>
          {errors.techId && (
            <span 
              id="tech-error" 
              className="error-message" 
              role="alert"
              aria-live="polite"
            >
              {errors.techId}
            </span>
          )}
          {selectedTech && !errors.techId && (
            <div className="tech-info">
              <p><strong>Категория:</strong> {selectedTech.category}</p>
              <p><strong>Сложность:</strong> {
                selectedTech.difficulty === 'easy' ? 'Легкая' :
                selectedTech.difficulty === 'medium' ? 'Средняя' : 'Сложная'
              }</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="deadline-input">
            Дедлайн изучения <span className="required">*</span>
          </label>
          <input
            type="date"
            id="deadline-input"
            name="deadline"
            value={deadline}
            onChange={handleDeadlineChange}
            min={minDate}
            className={errors.deadline ? 'error' : ''}
            aria-invalid={!!errors.deadline}
            aria-describedby={errors.deadline ? 'deadline-error' : undefined}
            aria-required="true"
            aria-label="Выберите дату дедлайна изучения технологии"
          />
          {errors.deadline && (
            <span 
              id="deadline-error" 
              className="error-message" 
              role="alert"
              aria-live="polite"
            >
              {errors.deadline}
            </span>
          )}
          {deadline && !errors.deadline && (
            <div className="deadline-preview">
              📅 Дедлайн установлен на: <strong>
                {new Date(deadline).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </strong>
            </div>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={!isValid}
          aria-label="Установить дедлайн изучения"
        >
          ✅ Установить дедлайн
        </button>

        {!isValid && (selectedTechId || deadline) && (
          <div className="validation-hint" role="status" aria-live="polite">
            ⚠️ Исправьте ошибки в форме для сохранения
          </div>
        )}
      </form>
    </div>
  );
}

export default DeadlineForm;

