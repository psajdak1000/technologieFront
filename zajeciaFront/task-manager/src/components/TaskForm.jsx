import { useState } from 'react';

function TaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Praca'); // Nowy stan dla kategorii
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError('Tytuł musi mieć minimum 3 znaki');
      return;
    }

    const newTask = {
      id: crypto.randomUUID(),
      title: title.trim(),
      priority,
      category, // Dodajemy kategorię do obiektu zadania
      completed: false
    };

    addTask(newTask);
    setTitle('');
    setPriority('medium');
    setCategory('Praca'); // Resetujemy kategorię
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input 
          type="text"
          placeholder="Co masz do zrobienia?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={error ? 'input-error' : ''}
        />
        <div className="form-info">
          <small>{title.length}/100 znaków</small>
          {error && <span className="error-text" style={{color: 'red', display: 'block'}}>{error}</span>}
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        {/* Wybór Priorytetu */}
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ flex: 1 }}>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        {/* Wybór Kategorii (Część A - pkt 16) */}
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ flex: 1 }}>
          <option value="Praca">Praca</option>
          <option value="Dom">Dom</option>
          <option value="Zakupy">Zakupy</option>
          <option value="Inne">Inne</option>
        </select>
      </div>

      <button type="submit" disabled={title.trim().length < 3}>
        Dodaj zadanie
      </button>
    </form>
  );
}

export default TaskForm;