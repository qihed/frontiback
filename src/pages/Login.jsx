// ПРАКТИКА 23: Страница Login - форма авторизации

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  // НОВОВВЕДЕНИЕ: Обработчик изменения полей формы
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы авторизации
  const handleSubmit = (e) => {
    e.preventDefault();

    // НОВОВВЕДЕНИЕ: Простая проверка (в реальном приложении здесь был бы запрос к серверу)
    if (formData.username.trim() && formData.password.trim()) {
      // НОВОВВЕДЕНИЕ: Сохранение данных авторизации в localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', formData.username);

      // НОВОВВЕДЕНИЕ: Вызов функции onLogin для обновления состояния в App
      if (onLogin) {
        onLogin(formData.username);
      }

      // НОВОВВЕДЕНИЕ: Перенаправление на главную страницу
      navigate('/');
    } else {
      setError('Заполните все поля');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>🔐 Вход в систему</h1>
        <p className="login-subtitle">Войдите в трекер технологий</p>

        {error && (
          <div className="error-message">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Введите имя пользователя"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Введите пароль"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Войти
          </button>
        </form>

        <p className="login-hint">
          💡 Для демонстрации введите любое имя пользователя и пароль
        </p>
      </div>
    </div>
  );
}

export default Login;

