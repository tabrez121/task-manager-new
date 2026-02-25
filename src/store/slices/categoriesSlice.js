import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {}, 
  allIds: [], 
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    addCategory: (state, action) => {
      const { id, name, color, icon = '' } = action.payload;

      state.byId[id] = {
        id,
        name,
        color,
        icon,
        createdAt: Date.now(),
      };

      state.allIds.push(id);
    },

    updateCategory: (state, action) => {
      const { id, changes } = action.payload;

      if (state.byId[id]) {
        Object.assign(state.byId[id], changes);
      }
    },

    deleteCategory: (state, action) => {
      const categoryId = action.payload;

      if (state.byId[categoryId]) {
        delete state.byId[categoryId];
        state.allIds = state.allIds.filter((id) => id !== categoryId);
      }
    },

    reorderCategories: (state, action) => {
      state.allIds = action.payload;
    },

    hydrateFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
  hydrateFromStorage: hydrateCategoriesFromStorage,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
