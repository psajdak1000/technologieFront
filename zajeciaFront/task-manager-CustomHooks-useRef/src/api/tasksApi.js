// src/api/tasksApi.js

// Symulacja zewnętrznego API
export const tasksApi = {
  // Pobieranie zadań z opóźnieniem 1.5s
  fetchTasks: async (signal) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5', { signal });
    if (!response.ok) throw new Error('Błąd pobierania danych');
    return response.json();
  },
  
  // Symulacja zapisywania danych
  saveTasks: async (tasks) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Zadania zapisane w chmurze:", tasks);
    return { success: true };
  }
};