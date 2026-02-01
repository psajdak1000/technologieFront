import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';
import Card from '../components/Card';

function TaskDetailsPage() {
  // 1. Pobieramy parametr z URL (np. dla adresu /tasks/5 -> param id = 5)
  const { taskId } = useParams();
  
  // 2. Pobieramy zadania z Contextu
  const { tasks } = useTasks();
  
  // 3. Nawigacja do powrotu
  const navigate = useNavigate();

  // 4. Szukamy zadania o tym ID
  // Uwaga: ID w URL to string, a w danych też string (crypto.randomUUID), więc porównujemy bezpiecznie
  const task = tasks.find(t => t.id.toString() === taskId);

  if (!task) {
    return (
      <Card title="Błąd">
        <p>Nie znaleziono zadania o ID: {taskId}</p>
        <button onClick={() => navigate('/tasks')}>Wróć do listy</button>
      </Card>
    );
  }

  return (
    <Card title="Szczegóły zadania">
      <div style={{ padding: '10px' }}>
        <h2 style={{ color: '#333', marginBottom: '10px' }}>{task.title}</h2>
        
        <div style={{ display: 'grid', gap: '10px', color: '#555' }}>
          <p><strong>ID:</strong> <small>{task.id}</small></p>
          <p><strong>Status:</strong> {task.completed ? '✅ Ukończone' : '⏳ W toku'}</p>
          <p><strong>Priorytet:</strong> {task.priority.toUpperCase()}</p>
          <p><strong>Kategoria:</strong> {task.category}</p>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          {/* Nawigacja programatyczna: cofnij się o 1 stronę */}
          <button 
            onClick={() => navigate(-1)} 
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            ⬅ Wróć
          </button>
        </div>
      </div>
    </Card>
  );
}

export default TaskDetailsPage;