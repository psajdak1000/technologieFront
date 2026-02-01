import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import { TasksProvider } from './context/TasksContext';
import { FilterProvider } from './context/FilterContext';
import { AuthProvider } from './context/AuthContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>  {/* Upewnij się, że BrowserRouter otacza wszystko */}
      <AuthProvider> {/* <--- Dodaj AuthProvider */}
        <TasksProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </TasksProvider>
      </AuthProvider>
    </BrowserRouter> 
  </StrictMode>,
);