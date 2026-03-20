import { useEffect, useRef } from 'react';
import { useTasks } from '../context/TasksContext';
import { useForm } from '../hooks/useForm';

function TaskForm() {
  // 1. ZMIANA: Zamiast 'addTask' pobieramy nasz 'dispatch'
  const { dispatch } = useTasks();
  
  const inputRef = useRef(null);

  const validate = (values) => {
    let errors = {};
    if (!values.title || values.title.trim().length < 3) {
      errors.title = 'Tytuł musi mieć minimum 3 znaki';
    }
    return errors;
  };

  const submitTask = (values) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      priority: values.priority,
      category: values.category,
      dueDate: values.dueDate, 
      completed: false
    };
    
    // 2. ZMIANA: Wysyłamy akcję ADD_TASK do naszego reducera!
    dispatch({ type: 'ADD_TASK', payload: newTask });

    inputRef.current?.focus();
  };

  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { title: '', priority: 'medium', category: 'Praca', dueDate: '' },
    validate,
    submitTask
  );

  useEffect(() => {
    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'n') {
        e.preventDefault(); 
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input 
          ref={inputRef}
          type="text"
          name="title"
          placeholder="Co masz do zrobienia?"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'input-error' : ''}
          id="task-input" 
          autoComplete="off"
        />
        <div className="form-info">
          <small>{values.title.length}/100 znaków</small>
          {errors.title && <span className="error-text" style={{color: 'red', display: 'block'}}>{errors.title}</span>}
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
        <select name="priority" value={values.priority} onChange={handleChange} style={{ flex: 1 }}>
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        <select name="category" value={values.category} onChange={handleChange} style={{ flex: 1 }}>
          <option value="Praca">Praca</option>
          <option value="Dom">Dom</option>
          <option value="Zakupy">Zakupy</option>
          <option value="Inne">Inne</option>
        </select>

        <input 
          type="date"
          name="dueDate"
          value={values.dueDate}
          onChange={handleChange}
          style={{ 
            flex: 1, 
            padding: '8px', 
            border: '1px solid var(--border-color)', 
            borderRadius: '4px',
            background: 'var(--input-bg)',
            color: 'var(--text-primary)'
          }}
        />
      </div>

      <button type="submit" disabled={values.title.length < 3}>
        Dodaj zadanie
      </button>
    </form>
  );
}

export default TaskForm;