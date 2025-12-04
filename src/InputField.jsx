// ПРАКТИКА 20: Работа с состоянием (useState) - Контролируемый input
// Компонент демонстрирует работу с формами и контролируемыми компонентами
// Контролируемый компонент - это компонент, значение которого управляется через состояние React

import { useState } from 'react';

function InputField() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения значения input поля
  // Начальное значение - пустая строка
  const [inputValue, setInputValue] = useState('');

  // НОВОВВЕДЕНИЕ: Обработчик изменения значения input
  // event.target.value содержит текущее значение поля ввода
  // setInputValue обновляет состояние, что вызывает перерендер с новым значением
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // НОВОВВЕДЕНИЕ: Обработчик очистки поля
  const handleClear = () => {
    setInputValue('');
  };

  return (
    <div className="input-field">
      <h2>Контролируемое поле ввода (Практика 20)</h2>
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Введите текст..."
          aria-label="Поле ввода текста"
        />
        <button onClick={handleClear} disabled={!inputValue}>
          Очистить
        </button>
      </div>
      {/* НОВОВВЕДЕНИЕ: Отображение текущего значения в реальном времени */}
      <p className="input-display">
        Вы ввели: <strong>{inputValue || '(пусто)'}</strong>
      </p>
      <p className="input-length">
        Длина текста: {inputValue.length} символов
      </p>
    </div>
  );
}

export default InputField;

