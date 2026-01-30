import TaskItem from './TaskItem';

// Komponent przyjmuje tablicę zadań oraz funkcje sterujące, w tym nową funkcję onUpdate 
function TaskList({ tasks, onToggle, onDelete, onChangePriority, onUpdate }) {
  
  // Część B: Obsługa pustej listy - wyświetlamy komunikat, gdy nie ma żadnych zadań 
  if (tasks.length === 0) {
    return <p>Brak zadań do wykonania! 🎉</p>;
  }

  return (
    // Kontener <ul> służący do grupowania elementów TaskItem 
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {/* Część B: Mapowanie tablicy tasks na poszczególne komponenty TaskItem  */}
      {tasks.map((task) => (
        <TaskItem 
          key={task.id}           // Klucz musi być unikalny, używamy ID zamiast indeksu 
          id={task.id}            // Przekazujemy ID do identyfikacji zadania 
          title={task.title}      // Przekazujemy tytuł zadania 
          priority={task.priority} // Przekazujemy priorytet (np. low, medium, high) 
          completed={task.completed} // Przekazujemy status ukończenia 
          
          // Przekazywanie funkcji obsługi zdarzeń w dół do komponentu potomnego 
          onToggle={onToggle}
          onDelete={onDelete}
          onChangePriority={onChangePriority}
          onUpdate={onUpdate}     // Przekazujemy nową funkcję aktualizacji tytułu 
        />
      ))}
    </ul>
  );
}

export default TaskList;