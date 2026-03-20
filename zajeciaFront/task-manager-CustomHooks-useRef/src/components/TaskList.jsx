import { useEffect, useRef, useState } from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TasksContext';
import { useFilters } from '../context/FilterContext';

function TaskList() {
  const { filteredTasks, searchQuery } = useFilters();
  const { toggleTask, deleteTask, changePriority, updateTask, tasks } = useTasks();

  // 1. Zgodnie z instrukcją: ref do ostatniego elementu
  const lastTaskRef = useRef(null);
  
  // 2. Stany pomocnicze do animacji
  const prevTasksLength = useRef(tasks.length);
  const [newTaskId, setNewTaskId] = useState(null);

  useEffect(() => {
    // Sprawdzamy, czy zadanie zostało DODANE (długość tablicy wzrosła)
    if (tasks.length > prevTasksLength.current) {
      
      // Pobieramy ID nowo dodanego zadania
      const newTask = tasks[tasks.length - 1];
      setNewTaskId(newTask.id);

      // Scrollujemy płynnie do ostatniego elementu używając referencji
      if (lastTaskRef.current) {
        lastTaskRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Cleanup: usuwamy klasę animacji po 1.5 sekundy
      const timer = setTimeout(() => setNewTaskId(null), 1500);

      prevTasksLength.current = tasks.length;
      return () => clearTimeout(timer);
    }
    
    prevTasksLength.current = tasks.length;
  }, [tasks]); // Reagujemy na zmiany w tablicy zadań

  if (filteredTasks.length === 0) {
    if (searchQuery) {
      return <p style={{textAlign: 'center', color: '#666'}}>Nie znaleziono zadań dla frazy «{searchQuery}»</p>;
    }
    return <p style={{textAlign: 'center'}}>Brak zadań na liście!</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task, index) => {
        // Sprawdzamy, czy to aktualnie renderowane zadanie jest ostatnie na liście
        const isLast = index === filteredTasks.length - 1;

        return (
          <TaskItem 
            key={task.id} 
            {...task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onChangePriority={changePriority}
            onUpdate={updateTask}
            
            // 3. Callback ref z instrukcji - przypisujemy refa tylko ostatniemu elementowi
            taskRef={(el) => {
              if (isLast) lastTaskRef.current = el;
            }}
            
            // 4. Przekazujemy flagę z informacją, czy to zadanie ma "migać"
            isNew={task.id === newTaskId}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;