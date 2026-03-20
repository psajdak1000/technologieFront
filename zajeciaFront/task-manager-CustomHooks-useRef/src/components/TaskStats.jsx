import { memo, useEffect, useState } from 'react';
import { useTasks } from '../context/TasksContext';
import { usePrevious } from '../hooks/usePrevious'; 

function TaskStats() {
  // --- ZMIANA: Wyciągamy 'state' i z niego bierzemy 'tasks' ---
  const { state } = useTasks();
  const tasks = state.tasks;
  
  const totalTasks = tasks.length;
  const activeTasks = tasks.filter(t => !t.completed).length;
  const completedTasks = tasks.filter(t => t.completed).length;

  // Używamy hooka, aby pamiętać ile zadań było przed chwilą
  const prevTotalTasks = usePrevious(totalTasks);
  
  // Stan dla komunikatu o zmianie ('added', 'removed', null)
  const [changeType, setChangeType] = useState(null);

  // Efekt: Wykrywamy zmianę liczby zadań i ustawiamy animację
  useEffect(() => {
    // Pomijamy pierwsze uruchomienie (gdy prev jest undefined)
    if (prevTotalTasks === undefined) return;

    if (totalTasks > prevTotalTasks) {
      setChangeType('added');
    } else if (totalTasks < prevTotalTasks) {
      setChangeType('removed');
    }

    // Resetujemy komunikat po 2 sekundach
    const timer = setTimeout(() => {
      setChangeType(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [totalTasks, prevTotalTasks]);

  // Style dla powiadomienia
  const getNotificationStyle = () => {
    const baseStyle = {
      marginLeft: '15px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      padding: '4px 8px',
      borderRadius: '4px',
      transition: 'opacity 0.3s ease-in-out',
      opacity: changeType ? 1 : 0
    };

    if (changeType === 'added') {
      return { ...baseStyle, color: '#27ae60', backgroundColor: '#e8f8f5', border: '1px solid #27ae60' };
    }
    if (changeType === 'removed') {
      return { ...baseStyle, color: '#c0392b', backgroundColor: '#f9ebe7', border: '1px solid #c0392b' };
    }
    return baseStyle;
  };

  return (
    <div className="stats-container" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', padding: '15px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <div className="stat-box">
        <strong>Wszystkie:</strong> {totalTasks}
        
        {/* Wyświetlanie komunikatu zmiany */}
        {changeType && (
          <span style={getNotificationStyle()}>
            {changeType === 'added' ? '⬆ Dodano!' : '⬇ Usunięto'}
          </span>
        )}
      </div>
      
      <div className="stat-box" style={{ color: '#2980b9' }}>
        <strong>Aktywne:</strong> {activeTasks}
      </div>
      
      <div className="stat-box" style={{ color: '#27ae60' }}>
        <strong>Ukończone:</strong> {completedTasks}
      </div>
    </div>
  );
}

export default memo(TaskStats);