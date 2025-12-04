// ПРАКТИКА 23: Страница TechnologyDetail - детальная информация о технологии

import { useParams, Link, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyCard from '../components/TechnologyCard';
import TechnologyNotes from '../components/TechnologyNotes';
import ProgressBar from '../components/ProgressBar';
import './TechnologyDetail.css';

function TechnologyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { technologies, updateStatus, updateNotes, deleteTechnology } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Поиск технологии по id из URL параметров
  const technology = technologies.find(tech => tech.id === Number(id));

  if (!technology) {
    return (
      <div className="technology-detail-page">
        <div className="not-found">
          <h2>Технология не найдена</h2>
          <p>Технология с ID {id} не существует</p>
          <Link to="/technologies" className="back-link">
            ← Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  // НОВОВВЕДЕНИЕ: Расчет прогресса для этой технологии
  const techProgress = technology.status === 'completed' ? 100 :
                      technology.status === 'in-progress' ? 50 : 0;

  // НОВОВВЕДЕНИЕ: Обработчик удаления технологии
  const handleDelete = () => {
    if (window.confirm(`Вы уверены, что хотите удалить технологию "${technology.title}"?`)) {
      deleteTechnology(technology.id);
      navigate('/technologies');
    }
  };

  return (
    <div className="technology-detail-page">
      <div className="detail-header">
        <Link to="/technologies" className="back-link">
          ← Вернуться к списку
        </Link>
        <div className="detail-actions">
          <Link 
            to={`/technologies/${id}/edit`} 
            className="edit-button"
          >
            ✏️ Редактировать
          </Link>
          <button 
            onClick={handleDelete}
            className="delete-button"
          >
            🗑️ Удалить
          </button>
        </div>
      </div>

      <div className="detail-content">
        <div className="detail-card-section">
          <TechnologyCard
            technology={technology}
            onStatusChange={updateStatus}
          />
        </div>

        <div className="detail-info-section">
          <div className="info-card">
            <h3>Прогресс изучения</h3>
            <ProgressBar 
              progress={techProgress}
              label={`Статус: ${technology.status === 'completed' ? 'Завершено' : 
                                    technology.status === 'in-progress' ? 'В процессе' : 'Не начато'}`}
              color={technology.status === 'completed' ? '#4caf50' : 
                     technology.status === 'in-progress' ? '#ff9800' : '#9e9e9e'}
              height={30}
            />
          </div>

          {technology.category && (
            <div className="info-card">
              <h3>Категория</h3>
              <p className="category-badge">{technology.category}</p>
            </div>
          )}

          {technology.difficulty && (
            <div className="info-card">
              <h3>Сложность</h3>
              <p className={`difficulty-badge difficulty-${technology.difficulty}`}>
                {technology.difficulty === 'easy' ? 'Легкая' : 
                 technology.difficulty === 'medium' ? 'Средняя' : 'Сложная'}
              </p>
            </div>
          )}

          {technology.description && (
            <div className="info-card">
              <h3>Описание</h3>
              <p>{technology.description}</p>
            </div>
          )}

          {/* НОВОВВЕДЕНИЕ: Отображение дедлайна (Практика 25) */}
          {technology.deadline && (
            <div className="info-card">
              <h3>Дедлайн изучения</h3>
              <p className="deadline-display">
                📅 {new Date(technology.deadline).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          )}

          {/* НОВОВВЕДЕНИЕ: Отображение ресурсов (Практика 25) */}
          {technology.resources && technology.resources.length > 0 && (
            <div className="info-card">
              <h3>Ресурсы для изучения</h3>
              <ul className="resources-list">
                {technology.resources.map((resource, index) => (
                  <li key={index}>
                    <a 
                      href={resource} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="resource-link"
                    >
                      🔗 {resource}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="detail-notes-section">
        <TechnologyNotes
          technology={technology}
          onNotesChange={updateNotes}
        />
      </div>
    </div>
  );
}

export default TechnologyDetail;

