import { createContext, useState, useContext, useMemo } from 'react'; //  Import useMemo
import { useTasks } from './TasksContext';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const { tasks } = useTasks();

  // Stany filtrów
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');

  // 2. OPTYMALIZACJA: useMemo zapamiętuje wynik tej funkcji.
  // Dzięki temu sortowanie i filtrowanie nie wykonuje się przy każdym kliknięciu w aplikacji,
  // a jedynie wtedy, gdy zmienią się dane wejściowe (tablica zależności na dole).
  const filteredTasks = useMemo(() => {
    
    // Ten log pokaże nam w konsoli, kiedy faktycznie liczymy.
    // Powinien się pojawić TYLKO gdy zmienisz filtr lub dodasz zadanie.
    console.log("🔄 Przeprowadzam kosztowne filtrowanie..."); 
    
    return tasks
      .filter(task => {
        // 1. Status
        if (filterStatus === 'active' && task.completed) return false;
        if (filterStatus === 'completed' && !task.completed) return false;
        
        // 2. Kategoria
        if (filterCategory !== 'all' && task.category !== filterCategory) return false;
        
        // 3. Wyszukiwanie
        if (searchQuery) {
          if (!task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        }
        return true;
      })
      .sort((a, b) => {
        // 4. Sortowanie
        if (sortType === 'alpha') return a.title.localeCompare(b.title);
        if (sortType === 'priority') {
          const priorityWeight = { high: 3, medium: 2, low: 1 };
          // (priorityWeight[b.priority] || 0) zabezpiecza przed brakiem priorytetu
          return (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        }
        return 0;
      });

  }, [tasks, filterStatus, filterCategory, searchQuery, sortType]); // <--- 3. Tablica zależności

  const value = {
    filterStatus, setFilterStatus,
    filterCategory, setFilterCategory,
    searchQuery, setSearchQuery,
    sortType, setSortType,
    filteredTasks // Przekazujemy wynik obliczony przez useMemo
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) throw new Error("useFilters error: must be used within FilterProvider");
    return context;
};