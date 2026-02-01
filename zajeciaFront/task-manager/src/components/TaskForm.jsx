import { useTasks } from '../context/TasksContext';
import { useForm } from '../hooks/useForm';

function TaskForm() {
  const { addTask } = useTasks();

  // Definicja walidacji
  const validate = (values) => {
    let errors = {};
    if (!values.title || values.title.trim().length < 3) {
      errors.title = 'Tytuł musi mieć minimum 3 znaki';
    }
    return errors;
  };

  // Definicja wysyłki
  const submitTask = (values) => {
    const newTask = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      priority: values.priority,
      category: values.category,
      completed: false
    };
    addTask(newTask);
  };

  // Użycie naszego Custom Hooka!
  const { values, errors, handleChange, handleBlur, handleSubmit } = useForm(
    { title: '', priority: 'medium', category: 'Praca' }, // Stan początkowy
    validate,
    submitTask
  );

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input 
          type="text"
          name="title" // Ważne: name musi pasować do klucza w values
          placeholder="Co masz do zrobienia?"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.title ? 'input-error' : ''}
          // useRef dla autofocusa dodamy w Zadaniu 6
          id="task-input" 
        />
        <div className="form-info">
          <small>{values.title.length}/100 znaków</small>
          {errors.title && <span className="error-text" style={{color: 'red', display: 'block'}}>{errors.title}</span>}
        </div>
      </div>

      <div className="form-row" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
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
      </div>

      <button type="submit" disabled={values.title.length < 3}>
        Dodaj zadanie
      </button>
    </form>
  );
}

export default TaskForm;