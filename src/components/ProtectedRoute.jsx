// ПРАКТИКА 23: Компонент ProtectedRoute - защищенный маршрут
// Показывает дочерний компонент только если пользователь авторизован

import { Navigate } from 'react-router-dom';

/**
 * НОВОВВЕДЕНИЕ: Компонент защищенного маршрута
 * Если пользователь не авторизован, перенаправляет на страницу входа
 * 
 * @param {boolean} isLoggedIn - Статус авторизации пользователя
 * @param {ReactNode} children - Дочерние компоненты (защищенный контент)
 */
function ProtectedRoute({ isLoggedIn, children }) {
  // НОВОВВЕДЕНИЕ: Если пользователь не авторизован, перенаправляем на /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // НОВОВВЕДЕНИЕ: Если авторизован, показываем защищенный контент
  return children;
}

export default ProtectedRoute;

