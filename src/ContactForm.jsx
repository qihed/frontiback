// ПРАКТИКА 22: Работа с формами и обработка событий
// Компонент демонстрирует создание формы с валидацией и обработкой события submit
// Форма собирает данные пользователя и валидирует их перед отправкой

import { useState } from 'react';

function ContactForm() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения значений полей формы
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // НОВОВВЕДЕНИЕ: Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState({});

  // НОВОВВЕДЕНИЕ: Состояние для отслеживания успешной отправки формы
  const [isSubmitted, setIsSubmitted] = useState(false);

  // НОВОВВЕДЕНИЕ: Функция валидации email с использованием регулярного выражения
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения значений полей формы
  // Обновляет состояние formData при изменении любого поля
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // НОВОВВЕДЕНИЕ: Очистка ошибки для поля при его изменении
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // НОВОВВЕДЕНИЕ: Функция валидации всех полей формы
  const validateForm = () => {
    const newErrors = {};

    // Валидация имени: должно быть не пустым и минимум 2 символа
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    // Валидация email: должен быть валидным
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Валидация сообщения: должно быть не пустым и минимум 10 символов
    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Сообщение должно содержать минимум 10 символов';
    }

    return newErrors;
  };

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы
  // preventDefault() предотвращает стандартное поведение формы (перезагрузку страницы)
  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Валидация формы перед отправкой
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      // Если есть ошибки, сохраняем их в состояние
      setErrors(validationErrors);
    } else {
      // Если ошибок нет, форма считается успешно отправленной
      console.log('Форма отправлена:', formData);
      setIsSubmitted(true);
      // НОВОВВЕДЕНИЕ: Очистка формы после успешной отправки
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      // Сброс сообщения об успехе через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  return (
    <div className="contact-form">
      <h2>Форма обратной связи (Практика 22)</h2>
      
      {/* НОВОВВЕДЕНИЕ: Сообщение об успешной отправке формы */}
      {isSubmitted && (
        <div className="success-message">
          ✅ Форма успешно отправлена! Спасибо за ваше сообщение.
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Элемент form с обработчиком onSubmit */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">
            Имя <span className="required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {/* НОВОВВЕДЕНИЕ: Отображение ошибки валидации для поля */}
          {errors.name && (
            <span id="name-error" className="error-message" role="alert">
              {errors.name}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Сообщение <span className="required">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className={errors.message ? 'error' : ''}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <span id="message-error" className="error-message" role="alert">
              {errors.message}
            </span>
          )}
        </div>

        {/* НОВОВВЕДЕНИЕ: Кнопка отправки формы типа submit */}
        <button type="submit" className="submit-button">
          Отправить
        </button>
      </form>
    </div>
  );
}

export default ContactForm;


