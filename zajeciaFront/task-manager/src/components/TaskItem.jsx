import { useState } from 'react'; // Importujemy hook do obsługi lokalnego stanu edycji 
import './TaskItem.css';

// Dodajemy 'category' do propsów, aby wyświetlić badge
function TaskItem({ id, title, completed, priority, category, onToggle, onDelete, onChangePriority, onUpdate }) {
  
  // Lokalny stan kontrolujący, czy zadanie jest w trybie edycji 
  const [isEditing, setIsEditing] = useState(false);
  // Lokalny stan przechowujący tekst wpisywany podczas edycji 
  const [editTitle, setEditTitle] = useState(title);

  // Funkcja pomocnicza do kolorów kategorii ( z Zadania 6)
  const getCategoryColor = (cat) => {
    switch(cat) {
      case 'Praca': return '#3498db'; // Niebieski
      case 'Dom': return '#2ecc71';   // Zielony
      case 'Zakupy': return '#9b59b6'; // Fioletowy
      default: return '#95a5a6';       // Szary (Inne)
    }
  };

  // Funkcja zapisująca wprowadzone zmiany 
  const handleSave = () => {
    // Walidacja: tytuł musi mieć minimum 3 znaki przed zapisem 
    if (editTitle.trim().length >= 3) {
      onUpdate(id, editTitle); // Wywołuje funkcję aktualizacji z App.jsx 
      setIsEditing(false); // Wyłącza tryb edycji
    }
  };

  // Obsługa skrótów klawiszowych: Enter zapisuje, Escape anuluje edycję 
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(title); // Przywraca pierwotny tytuł przy anulowaniu
      setIsEditing(false); // Wyłącza tryb edycji 
    }
  };

  const styles = {
    textDecoration: completed ? "line-through" : "none",
    color: completed ? "gray" : "black"
  };

  return (
    // Zmieniamy klasę CSS, aby pasowała do stylów z Zadania 6 (priority-high zamiast high)
    <li className={`task-item ${completed ? 'completed' : ''} priority-${priority}`}>
      
      <div className="task-left">
        {/* 1. Checkbox: używamy 'checked' zamiast 'defaultChecked' i podpinamy onToggle  */}
        <input 
          type="checkbox" 
          checked={completed} 
          onChange={() => onToggle(id)} // Wywołuje funkcję toggleTask z App.jsx 
          className="checkbox-round" // Dodana klasa dla ładniejszego wyglądu
        />
        
        <div className="task-content">
          {/* Jeśli isEditing jest true, pokazujemy pole tekstowe (input) */}
          {isEditing ? (
            <input 
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)} // Aktualizuje lokalny stan tekstu 
              onKeyDown={handleKeyDown} // Obsługuje Enter i Escape 
              autoFocus // Automatycznie ustawia kursor w polu po wejściu w edycję
              className="edit-input"
            />
          ) : (
            // W przeciwnym razie zwykły tekst (span) ORAZ badge kategorii
            <div className="task-header">
              <span style={styles} className="task-title">{title}</span>
              
              {/* Wyświetlanie Badge'a Kategorii (Zadanie 6) */}
              <span 
                className="category-badge" 
                style={{ backgroundColor: getCategoryColor(category) }}
              >
                {category || 'Inne'}
              </span>
            </div>
          )}
          
          {/* Wyświetlamy też tekstowy priorytet pod tytułem */}
          {!isEditing && <span className="priority-badge">{priority}</span>}
        </div>
      </div>
      
      <div className="task-actions">
        {/* 2. Zmiana priorytetu: Select */}
        <select 
          value={priority} 
          onChange={(e) => onChangePriority(id, e.target.value)} // Wywołuje changePriority z App.jsx 
          className="prio-select"
        >
          <option value="low">Niski</option>
          <option value="medium">Średni</option>
          <option value="high">Wysoki</option>
        </select>

        {/* Przycisk przełącza między trybem zapisu a trybem edycji  */}
        {isEditing ? (
          <button onClick={handleSave} className="btn-save">💾</button>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-edit">✏️</button>
        )}

        {/* 3. Przycisk Usuń: podpinamy onDelete  */}
        <button 
          className="btn-delete" // Zmieniona klasa na nowszą
          onClick={() => onDelete(id)} // Wywołuje funkcję deleteTask z App.jsx 
        >
          🗑️
        </button>
      </div>
    </li>
  );
}

export default TaskItem;