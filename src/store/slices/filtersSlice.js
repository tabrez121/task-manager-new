import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'all', // 'all' | 'completed' | 'pending'
  search: '', // Search query for fuzzy search
  categories: [], // Array of category IDs to filter by
  tags: [], // Array of tags to filter by
  sortBy: 'createdAt', // 'createdAt' | 'dueDate'
  sortOrder: 'asc', // 'asc' | 'desc'
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setStatusFilter: (state, action) => {
      state.status = action.payload; // 'all', 'completed', 'pending'
    },

    setSearchQuery: (state, action) => {
      state.search = action.payload;
    },

    setCategoryFilter: (state, action) => {
      state.categories = action.payload; // Array of category IDs
    },

    setTagFilter: (state, action) => {
      state.tags = action.payload; // Array of tags
    },

    setSortBy: (state, action) => {
      state.sortBy = action.payload; // 'createdAt' or 'dueDate'
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload; // 'asc' or 'desc'
    },

    resetFilters: (state) => {
      state.status = 'all';
      state.search = '';
      state.categories = [];
      state.tags = [];
      state.sortBy = 'createdAt';
      state.sortOrder = 'asc';
    },

    hydrateFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  setStatusFilter,
  setSearchQuery,
  setCategoryFilter,
  setTagFilter,
  setSortBy,
  setSortOrder,
  resetFilters,
  hydrateFromStorage: hydrateFiltersFromStorage,
} = filtersSlice.actions;

export default filtersSlice.reducer;
