function TaskList() {
  const tasks = [
    { id: 1, title: "Изучить JSX", completed: true },
    { id: 2, title: "Разобраться с компонентами", completed: false },
    { id: 3, title: "Освоить работу props", completed: false },
    { id: 4, title: "Отклеить этикетки", completed: false },
  ];
  return (
    <div className="task-list">
      <h2>Список задач</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.comleted ? "completed" : "pending"}>
            <span>{task.title}</span>
            {task.completed ? "✅" : "⏳"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
