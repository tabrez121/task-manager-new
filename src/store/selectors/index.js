import { createSelector } from 'reselect';
import Fuse from 'fuse.js';

// Base selectors
const selectTasksState = (state) => state.tasks;
const selectFiltersState = (state) => state.filters;
const selectCategoriesState = (state) => state.categories;

// Select all tasks as flat array
export const selectAllTasks = createSelector(
  [selectTasksState],
  (tasks) => {
    return tasks.allIds.map((id) => tasks.byId[id]).filter(Boolean);
  }
);

// Select task by ID
export const selectTaskById = (taskId) =>
  createSelector(
    [selectTasksState],
    (tasks) => tasks.byId[taskId]
  );

// Select filter status
export const selectFilterStatus = createSelector(
  [selectFiltersState],
  (filters) => filters.status
);

// Select search query
export const selectSearchQuery = createSelector(
  [selectFiltersState],
  (filters) => filters.search
);

// Select category filters
export const selectCategoryFilters = createSelector(
  [selectFiltersState],
  (filters) => filters.categories
);

// Select tag filters
export const selectTagFilters = createSelector(
  [selectFiltersState],
  (filters) => filters.tags
);

// Filter by status (all/completed/pending)
export const selectTasksByStatus = createSelector(
  [selectAllTasks, selectFilterStatus],
  (tasks, status) => {
    if (status === 'completed') return tasks.filter((t) => t.completed);
    if (status === 'pending') return tasks.filter((t) => !t.completed);
    return tasks;
  }
);

// Search tasks using fuzzy matching
export const selectSearchResults = createSelector(
  [selectTasksByStatus, selectSearchQuery],
  (tasks, query) => {
    if (!query.trim()) return tasks;

    const fuse = new Fuse(tasks, {
      keys: ['text', 'description', 'tags'],
      threshold: 0.3, // Fuzzy tolerance
      includeScore: true,
    });

    const results = fuse.search(query);
    return results.map((result) => result.item);
  }
);

// Filter by selected categories
export const selectTasksByCategory = createSelector(
  [selectSearchResults, selectCategoryFilters],
  (tasks, categoryFilters) => {
    if (categoryFilters.length === 0) return tasks;

    return tasks.filter((task) =>
      task.categories.some((cat) => categoryFilters.includes(cat))
    );
  }
);

// Final filtered tasks (combined all filters)
export const selectFilteredTasks = createSelector(
  [selectTasksByCategory],
  (tasks) => tasks
);

// Select all categories
export const selectAllCategories = createSelector(
  [selectCategoriesState],
  (categories) => {
    return categories.allIds
      .map((id) => categories.byId[id])
      .filter(Boolean);
  }
);

// Select category by ID
export const selectCategoryById = (categoryId) =>
  createSelector(
    [selectCategoriesState],
    (categories) => categories.byId[categoryId]
  );

// Get task stats
export const selectTaskStats = createSelector(
  [selectAllTasks],
  (tasks) => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter(
      (t) =>
        !t.completed && t.dueDate && t.dueDate < Date.now()
    ).length;

    return { total, completed, pending, overdue };
  }
);

// Get upcoming reminders (next 24 hours)
export const selectUpcomingReminders = createSelector(
  [selectAllTasks],
  (tasks) => {
    const now = Date.now();
    const tomorrow = now + 24 * 60 * 60 * 1000;

    return tasks.filter((task) => {
      if (task.completed || !task.dueDate || !task.reminder.enabled) {
        return false;
      }

      const reminderTime = task.dueDate - task.reminder.notifyBefore;
      return reminderTime >= now && reminderTime <= tomorrow;
    });
  }
);

// Get overdue tasks
export const selectOverdueTasks = createSelector(
  [selectAllTasks],
  (tasks) => {
    return tasks.filter(
      (t) =>
        !t.completed &&
        t.dueDate &&
        t.dueDate < Date.now()
    );
  }
);

// Select filter state object
export const selectFilters = createSelector(
  [selectFiltersState],
  (filters) => filters
);
