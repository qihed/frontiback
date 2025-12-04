// ПРАКТИКА 24: Страница UserList - пример загрузки пользователей с внешнего API
// Демонстрирует использование useApi хука с индикаторами загрузки и ошибок

import useApi from '../hooks/useApi';
import './UserList.css';

function UserList() {
  // НОВОВВЕДЕНИЕ: Использование useApi хука для загрузки пользователей
  // jsonplaceholder.typicode.com - тестовый API для демонстрации
  const { data: users, loading, error, refetch } = useApi(
    'https://jsonplaceholder.typicode.com/users',
    {},
    true // immediate = true - загрузить сразу при монтировании
  );

  return (
    <div className="user-list-page">
      <h1>👥 Список пользователей (Практика 24)</h1>
      <p className="page-description">
        Пример загрузки данных с внешнего API (jsonplaceholder.typicode.com)
      </p>

      {/* НОВОВВЕДЕНИЕ: Индикатор загрузки */}
      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Загрузка пользователей...</p>
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Отображение ошибки */}
      {error && (
        <div className="error-indicator">
          <h3>❌ Ошибка загрузки</h3>
          <p>{error}</p>
          <button onClick={refetch} className="retry-button">
            🔄 Попробовать снова
          </button>
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Отображение данных */}
      {!loading && !error && users && (
        <>
          <div className="users-header">
            <p className="users-count">Найдено пользователей: {users.length}</p>
            <button onClick={refetch} className="refetch-button">
              🔄 Обновить список
            </button>
          </div>

          <div className="users-grid">
            {users.map(user => (
              <div key={user.id} className="user-card">
                <div className="user-header">
                  <h3>{user.name}</h3>
                  <span className="username">@{user.username}</span>
                </div>
                
                <div className="user-info">
                  <p className="user-email">📧 {user.email}</p>
                  <p className="user-phone">📱 {user.phone}</p>
                  <p className="user-website">🌐 {user.website}</p>
                </div>

                <div className="user-address">
                  <p className="address-label">📍 Адрес:</p>
                  <p className="address-text">
                    {user.address.street}, {user.address.city}
                  </p>
                  <p className="address-text">
                    {user.address.zipcode}
                  </p>
                </div>

                <div className="user-company">
                  <p className="company-label">🏢 Компания:</p>
                  <p className="company-name">{user.company.name}</p>
                  <p className="company-catchphrase">"{user.company.catchPhrase}"</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default UserList;

