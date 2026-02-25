import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './slices/tasksSlice';
import filtersSlice from './slices/filtersSlice';
import categoriesSlice from './slices/categoriesSlice';
import persistenceMiddleware from './middleware/persistenceMiddleware';
import reminderMiddleware from './middleware/reminderMiddleware';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    filters: filtersSlice,
    categories: categoriesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    })
      .concat(persistenceMiddleware)
      .concat(reminderMiddleware),
});

export default store;
