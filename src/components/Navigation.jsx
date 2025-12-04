// ПРАКТИКА 23: Компонент Navigation - навигация по приложению

import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ isLoggedIn, userName, onLogout }) {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <NavLink to="/" className="brand-link">
            🚀 Трекер технологий
          </NavLink>
        </div>

        <div className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            end
          >
            Главная
          </NavLink>
          
          <NavLink 
            to="/technologies" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Технологии
          </NavLink>

          <NavLink 
            to="/examples" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            📚 Примеры
          </NavLink>

          <div className="nav-dropdown">
            <span className="nav-link">🌐 API Примеры</span>
            <div className="dropdown-content">
              <NavLink 
                to="/api-examples/users" 
                className={({ isActive }) => isActive ? 'dropdown-link active' : 'dropdown-link'}
              >
                👥 Пользователи
              </NavLink>
              <NavLink 
                to="/api-examples/products" 
                className={({ isActive }) => isActive ? 'dropdown-link active' : 'dropdown-link'}
              >
                🔍 Поиск товаров
              </NavLink>
            </div>
          </div>

          {isLoggedIn ? (
            <>
              <NavLink 
                to="/technologies/add" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
              >
                ➕ Добавить
              </NavLink>
              
              <div className="user-section">
                <span className="user-name">👤 {userName}</span>
                <button onClick={onLogout} className="logout-button">
                  Выйти
                </button>
              </div>
            </>
          ) : (
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
            >
              Войти
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

