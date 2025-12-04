import "./App.css";
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// ПРАКТИКА 23: Импорт страниц
import Home from './pages/Home';
import TechnologyList from './pages/TechnologyList';
import TechnologyDetail from './pages/TechnologyDetail';
import AddTechnology from './pages/AddTechnology';
import EditTechnology from './pages/EditTechnology';
import Login from './pages/Login';

// ПРАКТИКА 24: Импорт страниц с примерами работы с API
import UserList from './pages/UserList';
import ProductSearch from './pages/ProductSearch';

// ПРАКТИКА 23: Импорт компонентов навигации
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

// ПРАКТИКА 19: Базовые компоненты (для учебного режима)
import Greeting from "./Greeting";
import UserCard from "./UserCard";
import TaskList from "./TaskList";

// ПРАКТИКА 20: Импорт компонентов с использованием useState
import Counter from "./Counter";
import ToggleButton from "./ToggleButton";
import InputField from "./InputField";

// ПРАКТИКА 21: Импорт компонентов с использованием useEffect
import DocumentTitle from "./DocumentTitle";
import Timer from "./Timer";
import WindowSize from "./WindowSize";

// ПРАКТИКА 22: Импорт компонента формы с валидацией
import ContactForm from "./ContactForm";

// ПРАКТИКА 23: Импорт компонента работы с массивами и списками
import TodoList from "./TodoList";

// ПРАКТИКА 24: Импорт компонента фильтрации и условного рендеринга
import TechnologyFilter from "./TechnologyFilter";

// ПРАКТИКА 25: Импорт компонента импорта/экспорта данных
import DataImportExport from "./DataImportExport";

// ПРАКТИКА 26: Импорт Material-UI компонентов
import MaterialUIWrapper from "./MaterialUIWrapper";
import SimpleTechCard from "./SimpleTechCard";
import MaterialDashboard from "./MaterialDashboard";

function App() {
  // НОВОВВЕДЕНИЕ: Состояние авторизации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  // НОВОВВЕДЕНИЕ: Загрузка состояния авторизации из localStorage при монтировании
  useEffect(() => {
    const savedLoginStatus = localStorage.getItem('isLoggedIn');
    const savedUserName = localStorage.getItem('userName');
    
    if (savedLoginStatus === 'true' && savedUserName) {
      setIsLoggedIn(true);
      setUserName(savedUserName);
    }
  }, []);

  // НОВОВВЕДЕНИЕ: Обработчик входа в систему
  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUserName(username);
  };

  // НОВОВВЕДЕНИЕ: Обработчик выхода из системы
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  };

  // НОВОВВЕДЕНИЕ: Данные для Material-UI компонентов (практика 26)
  const sampleTechnologies = [
    { id: 1, title: 'React', category: 'frontend', description: 'Библиотека для создания пользовательских интерфейсов', status: 'completed' },
    { id: 2, title: 'Node.js', category: 'backend', description: 'Среда выполнения JavaScript на стороне сервера', status: 'in-progress' },
    { id: 3, title: 'MongoDB', category: 'database', description: 'NoSQL база данных', status: 'not-started' },
    { id: 4, title: 'Vue.js', category: 'frontend', description: 'Прогрессивный JavaScript фреймворк', status: 'completed' },
    { id: 5, title: 'Express', category: 'backend', description: 'Веб-фреймворк для Node.js', status: 'in-progress' },
  ];

  // НОВОВВЕДЕНИЕ: Обработчик изменения статуса технологии
  const handleStatusChange = (id, newStatus) => {
    console.log(`Технология ${id} изменена на статус: ${newStatus}`);
  };

  return (
    <BrowserRouter>
      <div className="App">
        {/* НОВОВВЕДЕНИЕ: Навигация для всех страниц */}
        <Navigation 
          isLoggedIn={isLoggedIn} 
          userName={userName}
          onLogout={handleLogout}
        />

        {/* НОВОВВЕДЕНИЕ: Маршруты приложения */}
        <Routes>
          {/* Публичные маршруты */}
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={
              isLoggedIn ? (
                <Navigate to="/technologies" replace />
              ) : (
                <Login onLogin={handleLogin} />
              )
            } 
          />

          {/* Защищенные маршруты */}
          <Route
            path="/technologies"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TechnologyList />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/technologies/:id"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <TechnologyDetail />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/technologies/add"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AddTechnology />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/technologies/:id/edit"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <EditTechnology />
              </ProtectedRoute>
            }
          />

          {/* ПРАКТИКА 24: Примеры работы с API */}
          <Route
            path="/api-examples/users"
            element={<UserList />}
          />
          
          <Route
            path="/api-examples/products"
            element={<ProductSearch />}
          />

          {/* Учебные компоненты (для демонстрации) */}
          <Route
            path="/examples"
            element={
              <>
                {/* ПРАКТИКА 19: Теоретическая часть */}
                <Greeting />
                
                <UserCard
                  name="Лариса Ивановна"
                  role="Администратор"
                  avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfVMhpKmVy_-iwfRLAiNiaDslMa-3oEz7KTw&x"
                  isOnline={true}
                />

                <TaskList />

                {/* ПРАКТИКА 20: Компоненты с использованием useState */}
                <Counter />
                <ToggleButton />
                <InputField />

                {/* ПРАКТИКА 21: Компоненты с использованием useEffect */}
                <DocumentTitle />
                <Timer />
                <WindowSize />

                {/* ПРАКТИКА 22: Форма с валидацией */}
                <ContactForm />

                {/* ПРАКТИКА 23: Работа с массивами и списками */}
                <TodoList />

                {/* ПРАКТИКА 24: Фильтрация и условный рендеринг */}
                <TechnologyFilter />

                {/* ПРАКТИКА 25: Импорт/экспорт данных, localStorage, drag-and-drop */}
                <DataImportExport />

                {/* ПРАКТИКА 26: Material-UI компоненты */}
                <MaterialUIWrapper>
                  <div style={{ marginTop: '40px' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Практика 26: Material-UI компоненты</h2>
                    
                    {/* Пример карточек технологий */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
                      {sampleTechnologies.slice(0, 3).map(tech => (
                        <SimpleTechCard
                          key={tech.id}
                          technology={tech}
                          onStatusChange={handleStatusChange}
                        />
                      ))}
                    </div>

                    {/* Dashboard с вкладками */}
                    <MaterialDashboard technologies={sampleTechnologies} />
                  </div>
                </MaterialUIWrapper>
              </>
            }
          />

          {/* Редирект на главную для несуществующих маршрутов */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
