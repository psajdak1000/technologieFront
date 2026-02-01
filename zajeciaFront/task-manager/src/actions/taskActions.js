// Action Creators - funkcje pomocnicze do tworzenia akcji

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading
});

export const tasksLoaded = (tasks) => ({
  type: 'TASKS_LOADED',
  payload: tasks
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error
});

export const addTaskAction = (task) => ({
  type: 'ADD_TASK',
  payload: task
});

export const deleteTaskAction = (id) => ({
  type: 'DELETE_TASK',
  payload: id
});

export const toggleTaskAction = (id) => ({
  type: 'TOGGLE_TASK',
  payload: id
});

export const updateTaskAction = (id, title) => ({
  type: 'UPDATE_TASK',
  payload: { id, title }
});

export const changePriorityAction = (id, priority) => ({
  type: 'CHANGE_PRIORITY',
  payload: { id, priority }
});

export const clearCompletedAction = () => ({
  type: 'CLEAR_COMPLETED'
});

export const clearAllAction = () => ({
  type: 'CLEAR_ALL'
});

export const toggleAllAction = () => ({
  type: 'TOGGLE_ALL'
});