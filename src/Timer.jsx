// ПРАКТИКА 21: useEffect и жизненный цикл компонентов
// Компонент демонстрирует использование useEffect для выполнения побочных эффектов
// useEffect позволяет выполнять код после рендера компонента

import { useState, useEffect } from 'react';

function Timer() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения времени в секундах
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // НОВОВВЕДЕНИЕ: useEffect с зависимостями для создания таймера
  // Первый аргумент - функция эффекта, второй - массив зависимостей
  // Если массив пустой [], эффект выполнится только при монтировании компонента
  // Если массив содержит зависимости, эффект выполнится при их изменении
  useEffect(() => {
    let interval = null;
    
    // Если таймер запущен, создаем интервал который обновляет секунды каждую секунду
    if (isRunning) {
      interval = setInterval(() => {
        // НОВОВВЕДЕНИЕ: Использование функционального обновления состояния
        // setSeconds(prev => prev + 1) гарантирует использование актуального значения
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // НОВОВВЕДЕНИЕ: Функция очистки (cleanup function)
    // Выполняется перед следующим запуском эффекта или при размонтировании компонента
    // Очищает интервал чтобы избежать утечек памяти
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]); // Зависимость: эффект перезапускается при изменении isRunning

  // НОВОВВЕДЕНИЕ: Функции управления таймером
  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // НОВОВВЕДЕНИЕ: Форматирование времени в формат MM:SS
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h2>Таймер (Практика 21)</h2>
      <div className="timer-display">
        <span className="time-value">{formatTime(seconds)}</span>
      </div>
      <div className="timer-controls">
        {!isRunning ? (
          <button onClick={start}>Старт</button>
        ) : (
          <button onClick={stop}>Стоп</button>
        )}
        <button onClick={reset}>Сброс</button>
      </div>
      <p className="timer-status">
        Статус: {isRunning ? '⏱️ Работает' : '⏸️ Остановлен'}
      </p>
    </div>
  );
}

export default Timer;

