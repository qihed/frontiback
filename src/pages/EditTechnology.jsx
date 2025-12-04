// ПРАКТИКА 25: Страница EditTechnology - редактирование технологии

import { useParams, useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';
import './EditTechnology.css';

function EditTechnology() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { technologies, updateAllTechnologies } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Поиск технологии для редактирования
  const technology = technologies.find(tech => tech.id === Number(id));

  if (!technology) {
    return (
      <div className="edit-technology-page">
        <div className="not-found">
          <h2>Технология не найдена</h2>
          <p>Технология с ID {id} не существует</p>
          <button onClick={() => navigate('/technologies')} className="back-button">
            ← Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  // НОВОВВЕДЕНИЕ: Обработчик сохранения изменений
  const handleSubmit = (formData) => {
    const updatedTechnologies = technologies.map(tech =>
      tech.id === Number(id) ? { ...tech, ...formData } : tech
    );
    updateAllTechnologies(updatedTechnologies);
    navigate(`/technologies/${id}`);
  };

  // НОВОВВЕДЕНИЕ: Обработчик отмены
  const handleCancel = () => {
    navigate(`/technologies/${id}`);
  };

  return (
    <div className="edit-technology-page">
      <div className="page-header">
        <h1>✏️ Редактировать технологию</h1>
        <button onClick={handleCancel} className="cancel-button">
          Отмена
        </button>
      </div>

      {/* НОВОВВЕДЕНИЕ: Использование TechnologyForm с initialData (Практика 25) */}
      <TechnologyForm
        initialData={technology}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditTechnology;

