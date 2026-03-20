import { useState, useRef, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';
import AutoResizeTextarea from './AutoResizeTextarea';
import './TaskItem.css';

// 1. ZMIANA: Dodajemy propsy onReorder, index, isFirstItem, isLastItem
function TaskItem({ id, title, completed, priority, category, dueDate, onToggle, onDelete, onChangePriority, onUpdate, taskRef, isNew, onReorder, index, isFirstItem, isLastItem }) {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const textareaRef = useRef(null);

  const toggleEdit = () => setIsEditing(prev => !prev);

  useEffect(() => {
    if (isEditing) textareaRef.current?.focus();
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
    if (e.key === 'Enter') { e.preventDefault(); handleSave(); }
    else if (e.key === 'Escape') { setEditTitle(title); toggleEdit(); }
  };

  return (
    <li ref={taskRef} className={`task-item ${completed ? 'completed' : ''} priority-${priority} ${isNew ? 'just-added' : ''}`}>
      <div className="task-left">
        <input type="checkbox" checked={completed} onChange={() => onToggle(id)} className="checkbox-round" />
        
        <div className="task-content" style={{ width: '100%' }}>
          {isEditing ? (
            <AutoResizeTextarea ref={textareaRef} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onKeyDown={handleKeyDown} className="edit-input" />
          ) : (
            <div className="task-header">
              <Link to={`/tasks/${id}`} style={{ textDecoration: 'none', color: 'inherit' }} className="task-title">
                 <span style={{ textDecoration: completed ? "line-through" : "none", color: completed ? "gray" : "var(--text-primary)", cursor: 'pointer', fontWeight: 'bold' }}>
                   {title}
                 </span>
              </Link>
              {dueDate && (
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '10px', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '12px', whiteSpace: 'nowrap' }}>
                  📅 {dueDate}
                </span>
              )}
              <span className="category-badge" style={{ backgroundColor: getCategoryColor(category) }}>{category || 'Inne'}</span>
            </div>
          )}
          {!isEditing && <span className="priority-badge">{priority}</span>}
        </div>
      </div>
      
      <div className="task-actions">
        {/* 2. ZMIANA: Dodajemy przyciski strzałek */}
        <div style={{ display: 'flex', flexDirection: 'column', marginRight: '10px', gap: '2px' }}>
          <button 
            onClick={() => onReorder(index, 'up')} 
            disabled={isFirstItem}
            style={{ padding: '0 4px', fontSize: '12px', cursor: isFirstItem ? 'not-allowed' : 'pointer', opacity: isFirstItem ? 0.3 : 1, background: 'transparent', border: 'none' }}
          >▲</button>
          <button 
            onClick={() => onReorder(index, 'down')} 
            disabled={isLastItem}
            style={{ padding: '0 4px', fontSize: '12px', cursor: isLastItem ? 'not-allowed' : 'pointer', opacity: isLastItem ? 0.3 : 1, background: 'transparent', border: 'none' }}
          >▼</button>
        </div>

        <select value={priority} onChange={(e) => onChangePriority(id, e.target.value)} className="prio-select">
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>
        {isEditing ? <button onClick={handleSave} className="btn-save">💾</button> : <button onClick={toggleEdit} className="btn-edit">✏️</button>}
        <button className="btn-delete" onClick={() => onDelete(id)}>🗑️</button>
      </div>
    </li>
  );
}
export default memo(TaskItem);