// ПРАКТИКА 24: Страница ProductSearch - поиск товаров с debounce и отменой запросов
// Демонстрирует использование useApi с debounce и AbortController

import { useState, useEffect, useRef } from 'react';
import useApi from '../hooks/useApi';
import './ProductSearch.css';

function ProductSearch() {
  // НОВОВВЕДЕНИЕ: Состояние поискового запроса
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  // НОВОВВЕДЕНИЕ: Ref для таймера debounce
  const debounceTimerRef = useRef(null);

  // НОВОВВЕДЕНИЕ: useEffect для реализации debounce
  // Задержка 500ms перед выполнением поиска
  useEffect(() => {
    // НОВОВВЕДЕНИЕ: Очистка предыдущего таймера
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // НОВОВВЕДЕНИЕ: Установка нового таймера
    debounceTimerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    // НОВОВВЕДЕНИЕ: Очистка таймера при размонтировании
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  // НОВОВВЕДЕНИЕ: Использование useApi только когда есть поисковый запрос
  // immediate = false - не загружать сразу, только при изменении debouncedQuery
  const { data: products, loading, error } = useApi(
    debouncedQuery 
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`
      : null,
    {},
    false // immediate = false
  );

  // НОВОВВЕДЕНИЕ: Перезапуск запроса при изменении debouncedQuery
  useEffect(() => {
    if (debouncedQuery) {
      // Запрос будет выполнен автоматически через useApi
    }
  }, [debouncedQuery]);

  return (
    <div className="product-search-page">
      <h1>🔍 Поиск товаров (Практика 24)</h1>
      <p className="page-description">
        Пример поиска с debounce (задержка 500ms) и автоматической отменой предыдущих запросов
      </p>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Введите название товара..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && !debouncedQuery && (
          <div className="debounce-indicator">
            ⏳ Ожидание завершения ввода...
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Поиск товаров...</p>
        </div>
      )}

      {error && (
        <div className="error-indicator">
          <h3>❌ Ошибка поиска</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && products && debouncedQuery && (
        <>
          <div className="results-header">
            <p className="results-count">
              Найдено товаров: {products.products?.length || 0}
            </p>
          </div>

          {products.products && products.products.length > 0 ? (
            <div className="products-grid">
              {products.products.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    {product.thumbnail && (
                      <img src={product.thumbnail} alt={product.title} />
                    )}
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-brand">{product.brand}</p>
                    <p className="product-description">{product.description}</p>
                    
                    <div className="product-footer">
                      <div className="product-price">
                        ${product.price}
                        {product.discountPercentage && (
                          <span className="discount">
                            -{product.discountPercentage}%
                          </span>
                        )}
                      </div>
                      <div className="product-rating">
                        ⭐ {product.rating}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <p>Товары не найдены</p>
            </div>
          )}
        </>
      )}

      {!debouncedQuery && !loading && (
        <div className="empty-state">
          <p>Введите запрос для поиска товаров</p>
        </div>
      )}
    </div>
  );
}

export default ProductSearch;

