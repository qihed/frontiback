// ПРАКТИКА 22: Кастомный хук useTechnologies для управления трекером технологий
// Использует useLocalStorage для сохранения данных и предоставляет функции управления

import useLocalStorage from './useLocalStorage';

// НОВОВВЕДЕНИЕ: Начальные данные технологий
const initialTechnologies = [
  {
    id: 1,
    title: 'React',
    description: 'Библиотека для создания пользовательских интерфейсов',
    category: 'frontend',
    difficulty: 'medium',
    status: 'not-started',
    notes: '',
    deadline: '',
    resources: []
  },
  {
    id: 2,
    title: 'Node.js',
    description: 'Среда выполнения JavaScript на стороне сервера',
    category: 'backend',
    difficulty: 'medium',
    status: 'not-started',
    notes: '',
    deadline: '',
    resources: []
  },
  {
    id: 3,
    title: 'MongoDB',
    description: 'NoSQL база данных',
    category: 'database',
    difficulty: 'hard',
    status: 'not-started',
    notes: '',
    deadline: '',
    resources: []
  },
  {
    id: 4,
    title: 'Vue.js',
    description: 'Прогрессивный JavaScript фреймворк',
    category: 'frontend',
    difficulty: 'easy',
    status: 'not-started',
    notes: '',
    deadline: '',
    resources: []
  },
  {
    id: 5,
    title: 'Express',
    description: 'Веб-фреймворк для Node.js',
    category: 'backend',
    difficulty: 'medium',
    status: 'not-started',
    notes: '',
    deadline: '',
    resources: []
  },
];

/**
 * НОВОВВЕДЕНИЕ: Кастомный хук для управления трекером технологий
 * Использует useLocalStorage для автоматического сохранения данных
 * 
 * @returns {object} Объект с technologies, функциями обновления и progress
 */
function useTechnologies() {
  // НОВОВВЕДЕНИЕ: Использование useLocalStorage для хранения технологий
  // Данные автоматически сохраняются в localStorage при изменении
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  // НОВОВВЕДЕНИЕ: Функция обновления статуса технологии по id
  const updateStatus = (id, newStatus) => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech =>
        tech.id === id ? { ...tech, status: newStatus } : tech
      )
    );
  };

  // НОВОВВЕДЕНИЕ: Функция обновления заметок технологии по id
  const updateNotes = (id, notes) => {
    setTechnologies(prevTechs =>
      prevTechs.map(tech =>
        tech.id === id ? { ...tech, notes } : tech
      )
    );
  };

  // НОВОВВЕДЕНИЕ: Функция добавления новой технологии
  const addTechnology = (newTech) => {
    const techWithId = {
      ...newTech,
      id: Date.now(), // НОВОВВЕДЕНИЕ: Использование timestamp как уникального id
      status: newTech.status || 'not-started',
      notes: newTech.notes || '',
      deadline: newTech.deadline || '',
      resources: newTech.resources || []
    };
    setTechnologies(prevTechs => [...prevTechs, techWithId]);
  };

  // НОВОВВЕДЕНИЕ: Функция удаления технологии по id
  const deleteTechnology = (id) => {
    setTechnologies(prevTechs => prevTechs.filter(tech => tech.id !== id));
  };

  // НОВОВВЕДЕНИЕ: Функция массового обновления всех технологий
  const updateAllTechnologies = (updatedTechs) => {
    setTechnologies(updatedTechs);
  };

  // НОВОВВЕДЕНИЕ: Функция расчета прогресса в процентах
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  // НОВОВВЕДЕНИЕ: Расчет прогресса
  const progress = calculateProgress();

  return {
    technologies,
    updateStatus,
    updateNotes,
    addTechnology,
    deleteTechnology,
    updateAllTechnologies,
    progress,
    calculateProgress
  };
}

export default useTechnologies;

