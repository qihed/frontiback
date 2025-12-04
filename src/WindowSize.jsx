// ПРАКТИКА 21: useEffect для отслеживания размера окна браузера
// Компонент демонстрирует использование useEffect для подписки на события браузера
// и очистку подписок при размонтировании компонента

import { useState, useEffect } from 'react';

function WindowSize() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения размеров окна
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // НОВОВВЕДЕНИЕ: useEffect для подписки на событие resize
  // Эффект выполняется при монтировании компонента
  useEffect(() => {
    // НОВОВВЕДЕНИЕ: Функция-обработчик события изменения размера окна
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // НОВОВВЕДЕНИЕ: Подписка на событие resize объекта window
    window.addEventListener('resize', handleResize);

    // НОВОВВЕДЕНИЕ: Функция очистки - отписка от события
    // Критически важно отписываться от событий чтобы избежать утечек памяти
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Пустой массив зависимостей - эффект выполнится только при монтировании

  return (
    <div className="window-size">
      <h2>Размер окна браузера (Практика 21)</h2>
      <div className="size-display">
        <div className="size-item">
          <strong>Ширина:</strong> {windowSize.width}px
        </div>
        <div className="size-item">
          <strong>Высота:</strong> {windowSize.height}px
        </div>
      </div>
      <p className="size-info">
        Измените размер окна браузера, чтобы увидеть обновление значений в реальном времени
      </p>
    </div>
  );
}

export default WindowSize;

