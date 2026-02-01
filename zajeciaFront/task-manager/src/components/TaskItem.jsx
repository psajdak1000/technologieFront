import { useState } from 'react';
import { useToggle } from '../hooks/useToggle';
import { Link } from 'react-router-dom';
import './TaskItem.css';

function TaskItem({ id, title, completed, priority, category, onToggle, onDelete, onChangePriority, onUpdate }) {
  
  const [isEditing, toggleEdit] = useToggle(false);
  const [editTitle, setEditTitle] = useState(title);

  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Praca': return '#3498db';
      case 'Dom': return '#2ecc71';
      case 'Zakupy': return '#9b59b6';
      default: return '#95a5a6';
    }
  };

  const handleSave = () => {
    if (editTitle.trim().length >= 3) {
      onUpdate(id, editTitle);
      toggleEdit();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    else if (e.key === 'Escape') {
      setEditTitle(title);
      toggleEdit();
    }
  };

  const styles = {
    textDecoration: completed ? "line-through" : "none",
    color: completed ? "gray" : "black"
  };

  return (
    <li className={`task-item ${completed ? 'completed' : ''} priority-${priority}`}>
      <div className="task-left">
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={() => onToggle(id)} 
          className="checkbox-round"
        />
        
        <div className="task-content">
          {isEditing ? (
            <input 
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} 
              onKeyDown={handleKeyDown} 
              autoFocus 
              className="edit-input"
            />
          ) : (
            <div className="task-header">
              {/* ZMIANA TUTAJ: Link ma 'textDecoration: none', żeby nie był podkreślony jak hiperłącze */}
              <Link 
                to={`/tasks/${id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }} 
                className="task-title"
              >
                 {/* ...styles (przekreślenie) jest teraz na span, więc działa poprawnie */}
                 <span style={{ ...styles, cursor: 'pointer', fontWeight: 'bold' }}>
                   {title}
                 </span>
              </Link>

              <span className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>
                {category || 'Inne'}
              </span>
            </div>
          )}
          {!isEditing && <span className="priority-badge">{priority}</span>}
        </div>
      </div>
      
      <div className="task-actions">
        <select 
          value={priority} 
          onChange={(e) => onChangePriority(id, e.target.value)} 
          className="prio-select"
        >
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        {isEditing ? (
          <button onClick={handleSave} className="btn-save">💾</button>
        ) : (
          <button onClick={toggleEdit} className="btn-edit">✏️</button>
        )}

        <button className="btn-delete" onClick={() => onDelete(id)}>🗑️</button>
      </div>
    </li>
  );
}

export default TaskItem;