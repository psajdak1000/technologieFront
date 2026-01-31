import { useTasks } from '../context/TasksContext';

function TaskStats() {
  const { tasks } = useTasks(); // Pobieramy zadania bezpośrednio

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const remaining = total - completed;
  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="stats-container">
      <div className="stat-item">Razem: <strong>{total}</strong></div>
      <div className="stat-item">Ukończone: <strong>{completed}</strong></div>
      <div className="stat-item">Postęp: <strong>{progress}%</strong></div>
    </div>
  );
}

export default TaskStats;