import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Importujemy nasze nowe Contexty
import { TasksProvider } from './context/TasksContext';
import { FilterProvider } from './context/FilterContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </TasksProvider>
  </StrictMode>,
);