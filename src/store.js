import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './features/projects/projectsSlice';
import tasksReducer from './features/tasks/tasksSlice';
import usersReducer from './features/users/usersSlice'; // Добавляем импорт

export const store = configureStore({
  reducer: {
    projects: projectsReducer,
    tasks: tasksReducer,
    users: usersReducer // Добавляем редюсер пользователей
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['your/action/type'],
        ignoredPaths: ['auth.user']
      },
    }),
});