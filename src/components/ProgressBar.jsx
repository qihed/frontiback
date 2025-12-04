// ПРАКТИКА 22: Переиспользуемый компонент ProgressBar
// Компонент отображает прогресс в виде прогресс-бара с процентами

import './ProgressBar.css';

/**
 * НОВОВВЕДЕНИЕ: Переиспользуемый компонент прогресс-бара
 * Не привязан к трекеру технологий, может использоваться для любого прогресса
 * 
 * @param {number} progress - Значение прогресса от 0 до 100
 * @param {string} label - Текст метки прогресса (опционально)
 * @param {string} color - Цвет прогресс-бара (опционально)
 * @param {number} height - Высота прогресс-бара в пикселях (опционально)
 */
function ProgressBar({ 
  progress = 0, 
  label = '', 
  color = '#4caf50',
  height = 20 
}) {
  // НОВОВВЕДЕНИЕ: Ограничение прогресса в диапазоне 0-100
  const clampedProgress = Math.max(0, Math.min(100, progress));

  return (
    <div className="progress-bar-wrapper">
      {label && (
        <div className="progress-bar-label">
          <span>{label}</span>
          <span className="progress-percentage">{clampedProgress}%</span>
        </div>
      )}
      
      <div 
        className="progress-bar-container"
        style={{ height: `${height}px` }}
      >
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${clampedProgress}%`,
            backgroundColor: color,
            height: `${height}px`
          }}
        />
      </div>
      
      {!label && (
        <div className="progress-bar-percentage-only">
          {clampedProgress}%
        </div>
      )}
    </div>
  );
}

export default ProgressBar;

