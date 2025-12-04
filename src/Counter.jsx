// ПРАКТИКА 20: Работа с состоянием (useState)
// Компонент счетчика демонстрирует использование хука useState для управления состоянием компонента
// useState позволяет компоненту "запоминать" значения между рендерами и обновлять UI при изменении

import { useState } from 'react';

function Counter() {
  // НОВОВВЕДЕНИЕ: Использование хука useState для создания состояния счетчика
  // useState возвращает массив: [текущее значение, функция для обновления]
  // Начальное значение счетчика - 0
  const [count, setCount] = useState(0);

  // НОВОВВЕДЕНИЕ: Функция увеличения счетчика
  // Использует функцию обновления setCount для изменения состояния
  // При вызове setCount компонент автоматически перерендерится с новым значением
  const increment = () => {
    setCount(count + 1);
  };

  // НОВОВВЕДЕНИЕ: Функция уменьшения счетчика
  const decrement = () => {
    setCount(count - 1);
  };

  // НОВОВВЕДЕНИЕ: Функция сброса счетчика
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="counter">
      <h2>Счетчик (Практика 20)</h2>
      <div className="counter-display">
        <span className="count-value">{count}</span>
      </div>
      <div className="counter-buttons">
        {/* НОВОВВЕДЕНИЕ: Обработчики событий onClick привязаны к функциям обновления состояния */}
        <button onClick={decrement} aria-label="Уменьшить счетчик">
          -
        </button>
        <button onClick={reset} aria-label="Сбросить счетчик">
          Сброс
        </button>
        <button onClick={increment} aria-label="Увеличить счетчик">
          +
        </button>
      </div>
      <p className="counter-info">
        Текущее значение: <strong>{count}</strong>
      </p>
    </div>
  );
}

export default Counter;

