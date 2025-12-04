// ПРАКТИКА 20: Компонент быстрых действий для трекера технологий
// Самостоятельная работа - кнопки для массовых операций над технологиями

import { useState } from 'react';
import './QuickActions.css';

function QuickActions({ technologies = [], onUpdateAll, onResetAll, onRandomSelect }) {
  // НОВОВВЕДЕНИЕ: Состояние для сообщения о выполнении действия
  const [actionMessage, setActionMessage] = useState('');

  // НОВОВВЕДЕНИЕ: Обработчик "Отметить все как выполненные"
  const handleMarkAllCompleted = () => {
    if (technologies.length === 0) {
      setActionMessage('Нет технологий для обновления');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }

    const updatedTechnologies = technologies.map(tech => ({
      ...tech,
      status: 'completed'
    }));

    if (onUpdateAll) {
      onUpdateAll(updatedTechnologies);
      setActionMessage(`✅ Все ${technologies.length} технологий отмечены как завершенные`);
    }
    setTimeout(() => setActionMessage(''), 3000);
  };

  // НОВОВВЕДЕНИЕ: Обработчик "Сбросить все статусы"
  const handleResetAll = () => {
    if (technologies.length === 0) {
      setActionMessage('Нет технологий для сброса');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }

    const resetTechnologies = technologies.map(tech => ({
      ...tech,
      status: 'not-started'
    }));

    if (onResetAll) {
      onResetAll(resetTechnologies);
      setActionMessage(`🔄 Статусы всех ${technologies.length} технологий сброшены`);
    }
    setTimeout(() => setActionMessage(''), 3000);
  };

  // НОВОВВЕДЕНИЕ: Обработчик "Случайный выбор следующей технологии"
  const handleRandomSelect = () => {
    if (technologies.length === 0) {
      setActionMessage('Нет технологий для выбора');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }

    // НОВОВВЕДЕНИЕ: Фильтруем только не завершенные технологии
    const availableTechs = technologies.filter(
      tech => tech.status !== 'completed'
    );

    if (availableTechs.length === 0) {
      setActionMessage('🎉 Все технологии завершены!');
      setTimeout(() => setActionMessage(''), 3000);
      return;
    }

    // НОВОВВЕДЕНИЕ: Выбираем случайную технологию
    const randomIndex = Math.floor(Math.random() * availableTechs.length);
    const selectedTech = availableTechs[randomIndex];

    if (onRandomSelect) {
      onRandomSelect(selectedTech);
      setActionMessage(`🎲 Выбрана технология: ${selectedTech.title}`);
    }
    setTimeout(() => setActionMessage(''), 3000);
  };

  return (
    <div className="quick-actions">
      <h3 className="actions-title">⚡ Быстрые действия</h3>
      
      {actionMessage && (
        <div className={`action-message ${actionMessage.includes('✅') ? 'success' : actionMessage.includes('🔄') ? 'info' : 'random'}`}>
          {actionMessage}
        </div>
      )}

      <div className="actions-buttons">
        <button 
          className="action-button action-complete"
          onClick={handleMarkAllCompleted}
          disabled={technologies.length === 0}
        >
          ✅ Отметить все как выполненные
        </button>

        <button 
          className="action-button action-reset"
          onClick={handleResetAll}
          disabled={technologies.length === 0}
        >
          🔄 Сбросить все статусы
        </button>

        <button 
          className="action-button action-random"
          onClick={handleRandomSelect}
          disabled={technologies.length === 0}
        >
          🎲 Случайный выбор следующей технологии
        </button>
      </div>

      <div className="actions-info">
        <p>Всего технологий: <strong>{technologies.length}</strong></p>
        <p>Не завершено: <strong>
          {technologies.filter(tech => tech.status !== 'completed').length}
        </strong></p>
      </div>
    </div>
  );
}

export default QuickActions;

