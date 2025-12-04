// ПРАКТИКА 24: Кастомный хук useApi для работы с внешними API
// Обрабатывает состояния загрузки, ошибок и отмену запросов через AbortController

import { useState, useEffect, useRef } from 'react';

/**
 * НОВОВВЕДЕНИЕ: Кастомный хук для работы с внешними API
 * 
 * @param {string} url - URL для запроса
 * @param {object} options - Опции запроса (method, headers, body и т.д.)
 * @param {boolean} immediate - Выполнить запрос сразу при монтировании (по умолчанию true)
 * @returns {object} Объект с data, loading, error, refetch
 */
function useApi(url, options = {}, immediate = true) {
  // НОВОВВЕДЕНИЕ: Состояния для данных, загрузки и ошибок
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  // НОВОВВЕДЕНИЕ: Ref для хранения AbortController
  // Позволяет отменить запрос при размонтировании компонента или новом запросе
  const abortControllerRef = useRef(null);

  // НОВОВВЕДЕНИЕ: Функция выполнения запроса
  const fetchData = async () => {
    // НОВОВВЕДЕНИЕ: Отмена предыдущего запроса, если он существует
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // НОВОВВЕДЕНИЕ: Создание нового AbortController для текущего запроса
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      // НОВОВВЕДЕНИЕ: Выполнение fetch запроса с signal для возможности отмены
      const response = await fetch(url, {
        ...options,
        signal: abortControllerRef.current.signal
      });

      // НОВОВВЕДЕНИЕ: Проверка успешности ответа
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // НОВОВВЕДЕНИЕ: Парсинг JSON ответа
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      // НОВОВВЕДЕНИЕ: Обработка ошибки AbortError (отмена запроса)
      if (err.name === 'AbortError') {
        console.log('Запрос был отменен');
        return;
      }
      
      // НОВОВВЕДЕНИЕ: Обработка других ошибок
      setError(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  // НОВОВВЕДЕНИЕ: useEffect для автоматического выполнения запроса при монтировании
  useEffect(() => {
    if (immediate && url) {
      fetchData();
    }

    // НОВОВВЕДЕНИЕ: Функция очистки - отмена запроса при размонтировании
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]); // Зависимость: перезапуск при изменении URL

  // НОВОВВЕДЕНИЕ: Функция refetch для повторного запроса
  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useApi;

