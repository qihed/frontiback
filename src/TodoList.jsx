// ПРАКТИКА 23: Работа с массивами и списками
// Компонент демонстрирует динамическое управление списком задач (CRUD операции)
// Показывает добавление, удаление и обновление элементов в массиве

import { useState } from 'react';

function TodoList() {
  // НОВОВВЕДЕНИЕ: Состояние для хранения массива задач
  // Каждая задача имеет id, text и completed статус
  const [todos, setTodos] = useState([
    { id: 1, text: 'Изучить React хуки', completed: false },
    { id: 2, text: 'Создать компонент списка', completed: true },
  ]);

  // НОВОВВЕДЕНИЕ: Состояние для хранения текста новой задачи
  const [newTodoText, setNewTodoText] = useState('');

  // НОВОВВЕДЕНИЕ: Функция добавления новой задачи в массив
  // Использует spread оператор для создания нового массива (иммутабельность)
  const addTodo = () => {
    if (newTodoText.trim()) {
      const newTodo = {
        id: Date.now(), // НОВОВВЕДЕНИЕ: Использование timestamp как уникального id
        text: newTodoText.trim(),
        completed: false
      };
      // НОВОВВЕДЕНИЕ: Добавление нового элемента в начало массива
      setTodos(prev => [newTodo, ...prev]);
      setNewTodoText(''); // Очистка поля ввода
    }
  };

  // НОВОВВЕДЕНИЕ: Функция удаления задачи из массива
  // Использует filter для создания нового массива без удаляемого элемента
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // НОВОВВЕДЕНИЕ: Функция переключения статуса выполнения задачи
  // Использует map для обновления конкретного элемента в массиве
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // НОВОВВЕДЕНИЕ: Функция редактирования текста задачи
  const editTodo = (id, newText) => {
    if (newText.trim()) {
      setTodos(prev => prev.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      ));
    }
  };

  // НОВОВВЕДЕНИЕ: Обработчик нажатия Enter в поле ввода
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  // НОВОВВЕДЕНИЕ: Подсчет статистики задач
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length
  };

  return (
    <div className="todo-list">
      <h2>Список задач (Практика 23)</h2>
      
      {/* НОВОВВЕДЕНИЕ: Форма для добавления новой задачи */}
      <div className="todo-input-section">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите новую задачу..."
          className="todo-input"
        />
        <button onClick={addTodo} className="add-button">
          Добавить
        </button>
      </div>

      {/* НОВОВВЕДЕНИЕ: Статистика задач */}
      <div className="todo-stats">
        <span>Всего: {stats.total}</span>
        <span>Выполнено: {stats.completed}</span>
        <span>Осталось: {stats.pending}</span>
      </div>

      {/* НОВОВВЕДЕНИЕ: Рендеринг списка задач с использованием map */}
      <ul className="todos">
        {todos.length === 0 ? (
          <li className="empty-message">Список задач пуст. Добавьте первую задачу!</li>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))
        )}
      </ul>
    </div>
  );
}

// НОВОВВЕДЕНИЕ: Отдельный компонент для элемента списка задач
function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  // НОВОВВЕДЕНИЕ: Обработчик сохранения редактирования
  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {/* НОВОВВЕДЕНИЕ: Чекбокс для переключения статуса */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="todo-checkbox"
      />
      
      {/* НОВОВВЕДЕНИЕ: Условный рендеринг: режим редактирования или просмотра */}
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
            className="edit-input"
            autoFocus
          />
          <button onClick={handleSave} className="save-button">Сохранить</button>
          <button onClick={() => {
            setIsEditing(false);
            setEditText(todo.text);
          }} className="cancel-button">Отмена</button>
        </div>
      ) : (
        <>
          <span className="todo-text" onDoubleClick={() => setIsEditing(true)}>
            {todo.text}
          </span>
          <div className="todo-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              ✏️
            </button>
            <button onClick={() => onDelete(todo.id)} className="delete-button">
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoList;


