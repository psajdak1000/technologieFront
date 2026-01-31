import { createContext, useState, useContext } from 'react';
import { useTasks } from './TasksContext';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  // Pobieramy surowe zadania z TasksContext
  const { tasks } = useTasks();

  // Stany filtrów (przeniesione z App.jsx)
  const [filterStatus, setFilterStatus] = useState('all');     // 'all', 'active', 'completed'
  const [filterCategory, setFilterCategory] = useState('all'); // 'all', 'Praca',...
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');         // 'default', 'priority', 'alpha'

  // Logika filtrowania i sortowania (przeniesiona z App.jsx)
  const filteredTasks = tasks
    .filter(task => {
      // 1. Status
      if (filterStatus === 'active' && task.completed) return false;
      if (filterStatus === 'completed' && !task.completed) return false;
      
      // 2. Kategoria
      if (filterCategory !== 'all' && task.category !== filterCategory) return false;

      // 3. Wyszukiwanie
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!task.title.toLowerCase().includes(query)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      // 4. Sortowanie
      if (sortType === 'alpha') {
        return a.title.localeCompare(b.title);
      } else if (sortType === 'priority') {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        // Zabezpieczenie na wypadek braku priorytetu
        const weightA = priorityWeight[a.priority] || 0;
        const weightB = priorityWeight[b.priority] || 0;
        return weightB - weightA;
      }
      return 0; // Domyślne (według kolejności dodania)
    });

  const value = {
    filterStatus, setFilterStatus,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery,
    sortType, setSortType,
    filteredTasks // Udostępniamy już gotową, przefiltrowaną listę!
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

// Custom Hook
export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider");
  }
  return context;
};