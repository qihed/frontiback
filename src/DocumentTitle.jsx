// ПРАКТИКА 21: useEffect для изменения заголовка документа
// Компонент демонстрирует использование useEffect для побочных эффектов,
// которые влияют на элементы вне компонента (например, document.title)

import { useState, useEffect } from 'react';

function DocumentTitle() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения пользовательского заголовка
  const [title, setTitle] = useState('Мое React приложение');

  // НОВОВВЕДЕНИЕ: useEffect для обновления заголовка документа
  // Выполняется каждый раз когда изменяется значение title
  useEffect(() => {
    // НОВОВВЕДЕНИЕ: Изменение заголовка страницы в браузере
    document.title = title;

    // НОВОВВЕДЕНИЕ: Опциональная функция очистки
    // Можно вернуть заголовок к исходному значению при размонтировании
    return () => {
      document.title = 'React App';
    };
  }, [title]); // Зависимость: эффект выполняется при изменении title

  // НОВОВВЕДЕНИЕ: Обработчик изменения заголовка
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div className="document-title">
      <h2>Изменение заголовка документа (Практика 21)</h2>
      <div className="title-input-container">
        <label htmlFor="title-input">
          Введите новый заголовок:
        </label>
        <input
          id="title-input"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Введите заголовок..."
        />
      </div>
      <p className="title-info">
        Текущий заголовок: <strong>{title}</strong>
      </p>
      <p className="title-hint">
        Проверьте вкладку браузера - заголовок должен обновиться автоматически!
      </p>
    </div>
  );
}

export default DocumentTitle;

