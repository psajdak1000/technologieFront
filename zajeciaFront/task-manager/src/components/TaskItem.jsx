import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import AutoResizeTextarea from './AutoResizeTextarea';
import './TaskItem.css';

// 1. NOWOŚĆ: Dodajemy dueDate do listy propsów
function TaskItem({ id, title, completed, priority, category, dueDate, onToggle, onDelete, onChangePriority, onUpdate }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  
  const textareaRef = useRef(null);

  const toggleEdit = () => {
    setIsEditing(prev => !prev);
  };

  useEffect(() => {
    if (isEditing) {
      textareaRef.current?.focus();
    }
  }, [isEditing]);

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
    if (e.key === 'Enter') {
      e.preventDefault(); 
      handleSave();
    }
    else if (e.key === 'Escape') {
      setEditTitle(title);
      toggleEdit();
    }
  };

  const styles = {
    textDecoration: completed ? "line-through" : "none",
    // 2. NOWOŚĆ: Używamy zmiennej zamiast 'black', żeby działało w Dark Mode
    color: completed ? "gray" : "var(--text-primary)" 
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
        
        <div className="task-content" style={{ width: '100%' }}>
          {isEditing ? (
            <AutoResizeTextarea
              ref={textareaRef}
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} 
              onKeyDown={handleKeyDown} 
              className="edit-input"
            />
          ) : (
            <div className="task-header">
              <Link 
                to={`/tasks/${id}`} 
                style={{ textDecoration: 'none', color: 'inherit' }} 
                className="task-title"
              >
                 <span style={{ ...styles, cursor: 'pointer', fontWeight: 'bold' }}>
                   {title}
                 </span>
              </Link>

              {/* 3. NOWOŚĆ: Wyświetlanie daty (jeśli istnieje) */}
              {dueDate && (
                <span style={{ 
                  fontSize: '0.8rem', 
                  color: 'var(--text-secondary)', 
                  marginLeft: '10px',
                  border: '1px solid var(--border-color)',
                  padding: '2px 6px',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap'
                }}>
                  📅 {dueDate}
                </span>
              )}

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

export default memo(TaskItem);