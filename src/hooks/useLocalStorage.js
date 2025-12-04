// ПРАКТИКА 22: Кастомный хук useLocalStorage
// Хук для работы с localStorage с синхронизацией состояния

import { useState, useEffect } from 'react';

/**
 * НОВОВВЕДЕНИЕ: Кастомный хук для работы с localStorage
 * Автоматически сохраняет изменения в localStorage и загружает данные при монтировании
 * 
 * @param {string} key - Ключ для хранения в localStorage
 * @param {any} initialValue - Начальное значение, если данных в localStorage нет
 * @returns {[any, function]} - Массив [значение, функция обновления]
 */
function useLocalStorage(key, initialValue) {
  // НОВОВВЕДЕНИЕ: Состояние для хранения значения
  // Используем функцию для ленивой инициализации (выполняется только при первом рендере)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // НОВОВВЕДЕНИЕ: Попытка получить значение из localStorage
      const item = window.localStorage.getItem(key);
      // НОВОВВЕДЕНИЕ: Если значение найдено, парсим JSON, иначе используем initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // НОВОВВЕДЕНИЕ: В случае ошибки (например, поврежденные данные) возвращаем initialValue
      console.error(`Ошибка загрузки из localStorage ключа "${key}":`, error);
      return initialValue;
    }
  });

  // НОВОВВЕДЕНИЕ: Функция обновления значения
  // Сохраняет новое значение и в состояние, и в localStorage
  const setValue = (value) => {
    try {
      // НОВОВВЕДЕНИЕ: Поддержка функционального обновления (как в useState)
      // Если value - функция, вызываем её с текущим значением
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // НОВОВВЕДЕНИЕ: Сохраняем в состояние
      setStoredValue(valueToStore);
      
      // НОВОВВЕДЕНИЕ: Сохраняем в localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // НОВОВВЕДЕНИЕ: Обработка ошибок (например, превышение квоты localStorage)
      console.error(`Ошибка сохранения в localStorage ключа "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;

