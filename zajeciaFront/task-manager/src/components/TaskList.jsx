import TaskItem from './TaskItem';
import { useTasks } from '../context/TasksContext';
import { useFilters } from '../context/FilterContext';

function TaskList() {
  // Pobieramy gotową, przefiltrowaną listę
  const { filteredTasks, searchQuery } = useFilters();
  
  // Pobieramy akcje do obsługi zadań
  const { toggleTask, deleteTask, changePriority, updateTask } = useTasks();

  if (filteredTasks.length === 0) {
    if (searchQuery) {
      return <p style={{textAlign: 'center', color: '#666'}}>Nie znaleziono zadań dla frazy «{searchQuery}»</p>;
    }
    return <p style={{textAlign: 'center'}}>Brak zadań na liście!</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map(task => (
        <TaskItem 
          key={task.id} 
          {...task} // Przekazujemy wszystkie pola zadania (id, title, priority...)
          onToggle={toggleTask}
          onDelete={deleteTask}
          onChangePriority={changePriority}
          onUpdate={updateTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;