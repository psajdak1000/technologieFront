import { useEffect, useRef, useState } from 'react';
import TaskItem from './TaskItem';
import { useTasks } from '../context/TasksContext';
import { useFilters } from '../context/FilterContext';

function TaskList() {
  const { filteredTasks, searchQuery } = useFilters();
  const { state, dispatch } = useTasks();
  const tasks = state.tasks;

  const lastTaskRef = useRef(null);
  const prevTasksLength = useRef(tasks.length);
  const [newTaskId, setNewTaskId] = useState(null);

  useEffect(() => {
    if (tasks.length > prevTasksLength.current) {
      const newTask = tasks[tasks.length - 1];
      setNewTaskId(newTask.id);

      if (lastTaskRef.current) {
        lastTaskRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      const timer = setTimeout(() => setNewTaskId(null), 1500);

      prevTasksLength.current = tasks.length;
      return () => clearTimeout(timer);
    }
    
    prevTasksLength.current = tasks.length;
  }, [tasks]);

  if (filteredTasks.length === 0) {
    if (searchQuery) {
      return <p style={{textAlign: 'center', color: '#666'}}>Nie znaleziono zadań dla frazy «{searchQuery}»</p>;
    }
    return <p style={{textAlign: 'center'}}>Brak zadań na liście!</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task, index) => {
        const isLast = index === filteredTasks.length - 1;

        return (
          <TaskItem 
            key={task.id} 
            {...task}
            onToggle={(id) => dispatch({ type: 'TOGGLE_TASK', payload: id })}
            onDelete={(id) => dispatch({ type: 'DELETE_TASK', payload: id })}
            onChangePriority={(id, priority) => dispatch({ type: 'CHANGE_PRIORITY', payload: { id, priority } })}
            onUpdate={(id, title) => dispatch({ type: 'UPDATE_TASK', payload: { id, title } })}
            
            // --- NOWE PROPSY DLA STRZAŁEK (REORDER) ---
            index={index}
            isFirstItem={index === 0}
            isLastItem={isLast}
            onReorder={(idx, direction) => dispatch({ type: 'REORDER_TASKS', payload: { index: idx, direction } })}
            // ----------------------------------------
            
            taskRef={(el) => {
              if (isLast) lastTaskRef.current = el;
            }}
            isNew={task.id === newTaskId}
          />
        );
      })}
    </ul>
  );
}

export default TaskList;