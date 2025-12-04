// ПРАКТИКА 20: Форма регистрации с валидацией
// Компонент демонстрирует работу с контролируемыми компонентами и валидацией формы

import { useState } from 'react';
import './RegistrationForm.css';

function RegistrationForm() {
  // НОВОВВЕДЕНИЕ: Состояние формы с полями name, email, password
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  // НОВОВВЕДЕНИЕ: Состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  // НОВОВВЕДЕНИЕ: Состояние успешной регистрации
  const [isSubmitted, setIsSubmitted] = useState(false);

  // НОВОВВЕДЕНИЕ: Функция валидации email с использованием регулярного выражения
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // НОВОВВЕДЕНИЕ: Обработчик изменения полей формы
  // Обновляет конкретное поле по name через computed property name
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

    // Валидация пароля: должен быть не пустым и минимум 6 символов
    if (!formData.password.trim()) {
      newErrors.password = 'Пароль обязателен для заполнения';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен содержать минимум 6 символов';
    }

    return newErrors;
  };

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // НОВОВВЕДЕНИЕ: Успешная регистрация
      console.log('Регистрация успешна:', formData);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setErrors({});
      
      // Сброс сообщения об успехе через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };

  // НОВОВВЕДЕНИЕ: Проверка валидности формы для дизейбла кнопки
  const isFormValid = formData.name.trim() && 
                      formData.email.trim() && 
                      validateEmail(formData.email) &&
                      formData.password.length >= 6;

  return (
    <div className="registration-form">
      <h2>Форма регистрации (Практика 20)</h2>
      
      {isSubmitted && (
        <div className="success-message">
          ✅ Регистрация успешна! Добро пожаловать, {formData.name || 'пользователь'}!
        </div>
      )}

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
            placeholder="Введите ваше имя"
          />
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
            placeholder="example@email.com"
          />
          {errors.email && (
            <span id="email-error" className="error-message" role="alert">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Пароль <span className="required">*</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            placeholder="Минимум 6 символов"
          />
          {errors.password && (
            <span id="password-error" className="error-message" role="alert">
              {errors.password}
            </span>
          )}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={!isFormValid}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;

