// ПРАКТИКА 23: Страница Home - приветственный экран трекера технологий

import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1 className="home-title">🚀 Трекер изучения технологий</h1>
        <p className="home-subtitle">
          Отслеживайте свой прогресс в изучении различных технологий и фреймворков
        </p>
        <div className="home-actions">
          <Link to="/technologies" className="home-button primary">
            Начать изучение
          </Link>
          <Link to="/login" className="home-button secondary">
            Войти в систему
          </Link>
        </div>
      </div>

      <div className="home-features">
        <h2>Возможности трекера</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Статистика прогресса</h3>
            <p>Отслеживайте общий прогресс изучения и статистику по категориям</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Заметки к технологиям</h3>
            <p>Добавляйте заметки и сохраняйте важную информацию</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Быстрые действия</h3>
            <p>Массовые операции над технологиями одним кликом</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Автосохранение</h3>
            <p>Все данные автоматически сохраняются в браузере</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

