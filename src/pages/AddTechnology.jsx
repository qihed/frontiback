// ПРАКТИКА 23: Страница AddTechnology - форма добавления новой технологии

import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import TechnologyForm from '../components/TechnologyForm';
import './AddTechnology.css';

function AddTechnology() {
  const navigate = useNavigate();
  const { addTechnology } = useTechnologies();

  // НОВОВВЕДЕНИЕ: Обработчик отправки формы TechnologyForm
  const handleSubmit = (formData) => {
    addTechnology(formData);
    navigate('/technologies');
  };

  // НОВОВВЕДЕНИЕ: Обработчик отмены
  const handleCancel = () => {
    navigate('/technologies');
  };

  return (
    <div className="add-technology-page">
      <div className="page-header">
        <h1>➕ Добавить новую технологию</h1>
      </div>

      {/* НОВОВВЕДЕНИЕ: Использование TechnologyForm (Практика 25) */}
      <TechnologyForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default AddTechnology;

