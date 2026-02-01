import { useEffect, useRef } from 'react'; // <--- 1. Importujemy hooki
import TaskItem from './TaskItem';
import { useTasks } from '../context/TasksContext';
import { useFilters } from '../context/FilterContext';

function TaskList() {
  const { filteredTasks, searchQuery } = useFilters();
  const { toggleTask, deleteTask, changePriority, updateTask, tasks } = useTasks();

  // 2. Tworzymy ref do "dołu" listy
  const bottomRef = useRef(null);

  // 3. Efekt: Scrollowanie na dół, gdy zmieni się długość listy (czyli np. po dodaniu zadania)
  useEffect(() => {
    // Sprawdzamy, czy mamy jakieś zadania i czy nie filtrujemy (chcemy scrollować przy dodawaniu)
    if (filteredTasks.length > 0 && !searchQuery) {
       // scrollIntoView to metoda DOM - { behavior: 'smooth' } daje płynną animację
       bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [tasks.length, filteredTasks.length, searchQuery]); // Zależność: długość tablicy

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
          {...task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onChangePriority={changePriority}
          onUpdate={updateTask}
        />
      ))}
      {/* 4. Niewidzialny element na końcu listy, do którego będziemy scrollować */}
      <div ref={bottomRef} />
    </ul>
  );
}

export default TaskList;