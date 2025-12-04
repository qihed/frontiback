// ПРАКТИКА 25: Импорт и экспорт данных, работа с localStorage и drag-and-drop
// Компонент демонстрирует работу с файлами, localStorage и drag-and-drop функциональностью
// Интегрирован с основным трекером технологий

import { useState } from 'react';
import useTechnologies from './hooks/useTechnologies.js';

function DataImportExport() {
  // НОВОВВЕДЕНИЕ: Использование useTechnologies для работы с основным трекером
  const { technologies, updateAllTechnologies } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Состояние для сообщений о статусе операций
  const [status, setStatus] = useState('');

  // НОВОВВЕДЕНИЕ: Состояние для отслеживания перетаскивания файла
  const [isDragging, setIsDragging] = useState(false);

  // НОВОВВЕДЕНИЕ: Функция сохранения данных в localStorage
  // Данные уже сохраняются автоматически через useTechnologies, но можно принудительно сохранить
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('technologies', JSON.stringify(technologies));
      setStatus('Данные сохранены в localStorage');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка сохранения данных');
      console.error('Ошибка сохранения:', error);
    }
  };

  // НОВОВВЕДЕНИЕ: Функция загрузки данных из localStorage (принудительная перезагрузка)
  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('technologies');
      if (saved) {
        const parsed = JSON.parse(saved);
        updateAllTechnologies(parsed);
        setStatus('Данные загружены из localStorage');
        setTimeout(() => setStatus(''), 3000);
      } else {
        setStatus('Нет сохраненных данных в localStorage');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (error) {
      setStatus('Ошибка загрузки данных из localStorage');
      console.error('Ошибка загрузки:', error);
    }
  };

  // НОВОВВЕДЕНИЕ: Экспорт данных в JSON-файл
  // Создает Blob объект и программно инициирует скачивание файла
  const exportToJSON = () => {
    try {
      // НОВОВВЕДЕНИЕ: Преобразование данных в JSON-строку с форматированием
      const dataStr = JSON.stringify(technologies, null, 2);

      // НОВОВВЕДЕНИЕ: Создание Blob объекта из строки
      // Blob представляет собой файлоподобный объект с неизменяемыми данными
      const dataBlob = new Blob([dataStr], { type: 'application/json' });

      // НОВОВВЕДЕНИЕ: Создание временной ссылки для скачивания
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

      // НОВОВВЕДЕНИЕ: Программный клик по ссылке для начала скачивания
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // НОВОВВЕДЕНИЕ: Освобождение памяти (revokeObjectURL)
      URL.revokeObjectURL(url);

      setStatus('Данные экспортированы в JSON');
      setTimeout(() => setStatus(''), 3000);
    } catch (error) {
      setStatus('Ошибка экспорта данных');
      console.error('Ошибка экспорта:', error);
    }
  };

  // НОВОВВЕДЕНИЕ: Импорт данных из JSON-файла
  // Использует FileReader API для чтения файла асинхронно
  const importFromJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    // НОВОВВЕДЕНИЕ: Обработчик завершения чтения файла
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);

        // НОВОВВЕДЕНИЕ: Проверка что импортированные данные - это массив
        if (!Array.isArray(imported)) {
          throw new Error('Неверный формат данных');
        }

        // НОВОВВЕДЕНИЕ: Валидация структуры данных
        const validTechs = imported.filter(tech => 
          tech && typeof tech === 'object' && tech.title
        );

        if (validTechs.length === 0) {
          throw new Error('Нет валидных технологий в файле');
        }

        // НОВОВВЕДЕНИЕ: Обновление трекера импортированными данными
        updateAllTechnologies(validTechs);
        setStatus(`Импортировано ${validTechs.length} технологий`);
        setTimeout(() => setStatus(''), 3000);
      } catch (error) {
        setStatus('Ошибка импорта: неверный формат файла');
        console.error('Ошибка импорта:', error);
      }
    };

    // НОВОВВЕДЕНИЕ: Запуск асинхронного чтения файла как текста
    reader.readAsText(file);

    // НОВОВВЕДЕНИЕ: Сброс значения input для возможности повторного импорта того же файла
    event.target.value = '';
  };

  // НОВОВВЕДЕНИЕ: Обработчики drag-and-drop событий
  // Drag-and-drop позволяет перетаскивать файлы в область браузера
  const handleDragOver = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение браузера
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/json') {
      // НОВОВВЕДЕНИЕ: Использование той же логики чтения что и в importFromJSON
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          if (Array.isArray(imported)) {
            const validTechs = imported.filter(tech => 
              tech && typeof tech === 'object' && tech.title
            );
            if (validTechs.length > 0) {
              updateAllTechnologies(validTechs);
              setStatus(`Импортировано ${validTechs.length} технологий`);
              setTimeout(() => setStatus(''), 3000);
            } else {
              setStatus('Ошибка импорта: нет валидных технологий в файле');
              setTimeout(() => setStatus(''), 3000);
            }
          } else {
            setStatus('Ошибка импорта: неверный формат данных');
            setTimeout(() => setStatus(''), 3000);
          }
        } catch (error) {
          setStatus('Ошибка импорта: неверный формат файла');
          setTimeout(() => setStatus(''), 3000);
        }
      };
      reader.readAsText(file);
    } else {
      setStatus('Пожалуйста, перетащите JSON файл');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  return (
    <div className="data-import-export">
      <h2>Импорт и экспорт данных (Практика 25)</h2>

      {/* НОВОВВЕДЕНИЕ: Статусное сообщение */}
      {status && (
        <div className={`status-message ${status.includes('Ошибка') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      {/* НОВОВВЕДЕНИЕ: Кнопки управления */}
      <div className="controls">
        <button onClick={exportToJSON} disabled={technologies.length === 0}>
          Экспорт в JSON
        </button>

        <label className="file-input-label">
          Импорт из JSON
          <input
            type="file"
            accept=".json"
            onChange={importFromJSON}
            style={{ display: 'none' }}
          />
        </label>

        <button onClick={saveToLocalStorage} disabled={technologies.length === 0}>
          Сохранить в localStorage
        </button>

        <button onClick={loadFromLocalStorage}>
          Загрузить из localStorage
        </button>
      </div>

      {/* НОВОВВЕДЕНИЕ: Область drag-and-drop */}
      <div
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <p>Отпустите файл здесь</p>
        ) : (
          <p>Перетащите JSON-файл сюда или используйте кнопку "Импорт из JSON"</p>
        )}
      </div>

      {/* НОВОВВЕДЕНИЕ: Список импортированных технологий */}
      {technologies.length > 0 && (
        <div className="technologies-list">
          <h3>Текущие технологии ({technologies.length})</h3>
          <ul>
            {technologies.map((tech, index) => (
              <li key={tech.id || index}>
                <strong>{tech.title}</strong> - {tech.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default DataImportExport;


