// ПРАКТИКА 25: Продвинутая форма TechnologyForm с дедлайнами и ресурсами
// Форма для создания/редактирования технологии с валидацией дедлайнов

import { useState, useEffect } from 'react';
import './TechnologyForm.css';

function TechnologyForm({ initialData = null, onSubmit, onCancel }) {
  // НОВОВВЕДЕНИЕ: Состояние формы с полями formData, errors, isFormValid
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'frontend',
    difficulty: 'medium',
    status: 'not-started',
    deadline: '',
    resources: [''],
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // НОВОВВЕДЕНИЕ: Заполнение формы начальными данными при редактировании
  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'frontend',
        difficulty: initialData.difficulty || 'medium',
        status: initialData.status || 'not-started',
        deadline: initialData.deadline || '',
        resources: initialData.resources && initialData.resources.length > 0 
          ? initialData.resources 
          : [''],
        notes: initialData.notes || ''
      });
    }
  }, [initialData]);

  // НОВОВВЕДЕНИЕ: Валидация формы при изменении данных
  useEffect(() => {
    validateForm();
  }, [formData]);

  // НОВОВВЕДЕНИЕ: Функция валидации формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация названия
    if (!formData.title.trim()) {
      newErrors.title = 'Название обязательно';
    }

    // Валидация описания
    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно';
    }

    // НОВОВВЕДЕНИЕ: Валидация дедлайна - не должен быть в прошлом
    if (formData.deadline) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // НОВОВВЕДЕНИЕ: Обнуление времени для сравнения только дат
      
      const deadlineDate = new Date(formData.deadline);
      deadlineDate.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newErrors.deadline = 'Дедлайн не может быть в прошлом';
      }
    }

    // НОВОВВЕДЕНИЕ: Валидация ресурсов - хотя бы один должен быть заполнен
    const validResources = formData.resources.filter(r => r.trim() !== '');
    if (validResources.length === 0) {
      newErrors.resources = 'Добавьте хотя бы один ресурс';
    }

    // НОВОВВЕДЕНИЕ: Валидация URL ресурсов
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    formData.resources.forEach((resource, index) => {
      if (resource.trim() && !urlRegex.test(resource.trim())) {
        if (!newErrors.resources) {
          newErrors.resources = {};
        }
        newErrors.resources[index] = 'Введите корректный URL';
      }
    });

    setErrors(newErrors);
    
    // НОВОВВЕДЕНИЕ: Форма валидна если нет ошибок и обязательные поля заполнены
    const isValid = Object.keys(newErrors).length === 0 && 
                    formData.title.trim() && 
                    formData.description.trim() &&
                    (formData.resources.filter(r => r.trim() !== '').length > 0);
    setIsFormValid(isValid);
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Очистка ошибки для поля
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения ресурса
  const handleResourceChange = (index, value) => {
    const newResources = [...formData.resources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      resources: newResources
    }));
  };

  // НОВОВВЕДЕНИЕ: Добавление нового поля ресурса
  const handleAddResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, '']
    }));
  };

  // НОВОВВЕДЕНИЕ: Удаление поля ресурса (но всегда должно оставаться хотя бы одно)
  const handleRemoveResource = (index) => {
    if (formData.resources.length > 1) {
      const newResources = formData.resources.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        resources: newResources
      }));
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    // НОВОВВЕДЕНИЕ: Фильтрация пустых ресурсов перед отправкой
    const filteredResources = formData.resources.filter(r => r.trim() !== '');
    
    const techData = {
      ...formData,
      resources: filteredResources
    };

    if (onSubmit) {
      onSubmit(techData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="technology-form">
      <div className="form-group">
        <label htmlFor="title">
          Название технологии <span className="required">*</span>
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={errors.title ? 'error' : ''}
          placeholder="Например: React"
        />
        {errors.title && (
          <span className="error-message">{errors.title}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">
          Описание <span className="required">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={errors.description ? 'error' : ''}
          rows="4"
          placeholder="Описание технологии..."
        />
        {errors.description && (
          <span className="error-message">{errors.description}</span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="devops">DevOps</option>
            <option value="mobile">Mobile</option>
            <option value="other">Другое</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="difficulty">Сложность</label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
          >
            <option value="easy">Легкая</option>
            <option value="medium">Средняя</option>
            <option value="hard">Сложная</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Статус</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not-started">Не начато</option>
            <option value="in-progress">В процессе</option>
            <option value="completed">Завершено</option>
          </select>
        </div>
      </div>

      {/* НОВОВВЕДЕНИЕ: Поле дедлайна с валидацией */}
      <div className="form-group">
        <label htmlFor="deadline">
          Дедлайн изучения
        </label>
        <input
          type="date"
          id="deadline"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className={errors.deadline ? 'error' : ''}
          min={new Date().toISOString().split('T')[0]} // НОВОВВЕДЕНИЕ: Минимальная дата - сегодня
        />
        {errors.deadline && (
          <span className="error-message">{errors.deadline}</span>
        )}
        {formData.deadline && !errors.deadline && (
          <span className="deadline-info">
            📅 Дедлайн: {new Date(formData.deadline).toLocaleDateString('ru-RU')}
          </span>
        )}
      </div>

      {/* НОВОВВЕДЕНИЕ: Массив ресурсов с возможностью добавления/удаления */}
      <div className="form-group">
        <label>
          Ресурсы для изучения <span className="required">*</span>
          <span className="hint">(URL ссылки на материалы)</span>
        </label>
        {formData.resources.map((resource, index) => (
          <div key={index} className="resource-input-group">
            <input
              type="url"
              value={resource}
              onChange={(e) => handleResourceChange(index, e.target.value)}
              placeholder="https://example.com/resource"
              className={errors.resources && (errors.resources === 'Добавьте хотя бы один ресурс' || errors.resources[index]) ? 'error' : ''}
            />
            {formData.resources.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveResource(index)}
                className="remove-resource-button"
                aria-label="Удалить ресурс"
              >
                🗑️
              </button>
            )}
            {errors.resources && typeof errors.resources === 'object' && errors.resources[index] && (
              <span className="error-message">{errors.resources[index]}</span>
            )}
          </div>
        ))}
        {errors.resources && typeof errors.resources === 'string' && (
          <span className="error-message">{errors.resources}</span>
        )}
        <button
          type="button"
          onClick={handleAddResource}
          className="add-resource-button"
        >
          ➕ Добавить ресурс
        </button>
      </div>

      <div className="form-group">
        <label htmlFor="notes">Заметки</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Добавьте заметки..."
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="submit-button"
          disabled={!isFormValid}
        >
          {initialData ? '💾 Сохранить изменения' : '➕ Добавить технологию'}
        </button>
        {onCancel && (
          <button 
            type="button" 
            onClick={onCancel}
            className="cancel-button"
          >
            Отмена
          </button>
        )}
      </div>

      {!isFormValid && (
        <div className="form-validation-hint">
          ⚠️ Заполните все обязательные поля для сохранения
        </div>
      )}
    </form>
  );
}

export default TechnologyForm;

