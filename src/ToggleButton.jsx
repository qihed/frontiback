// ПРАКТИКА 20: Работа с состоянием (useState) - Переключатель
// Компонент демонстрирует использование булевого состояния для переключения видимости/состояния элемента

import { useState } from 'react';

function ToggleButton() {
  // НОВОВВЕДЕНИЕ: Булевое состояние для отслеживания включен/выключен
  // Начальное значение - false (выключено)
  const [isOn, setIsOn] = useState(false);

  // НОВОВВЕДЕНИЕ: Функция переключения состояния
  // Использует предыдущее значение состояния для инвертирования
  const toggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="toggle-button">
      <h2>Переключатель (Практика 20)</h2>
      <button 
        onClick={toggle}
        className={isOn ? 'toggle-on' : 'toggle-off'}
        aria-pressed={isOn}
        aria-label={isOn ? 'Выключить' : 'Включить'}
      >
        {isOn ? 'Включено' : 'Выключено'}
      </button>
      {/* НОВОВВЕДЕНИЕ: Условный рендеринг на основе состояния */}
      {isOn && (
        <p className="toggle-message">
          Переключатель активен! 🎉
        </p>
      )}
    </div>
  );
}

export default ToggleButton;

