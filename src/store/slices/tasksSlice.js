import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  byId: {}, 
  allIds: [], 
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { id, text, description = '', categories = [], tags = [] } = action.payload;

      state.byId[id] = {
        id,
        text,
        description,
        completed: false,
        categories,
        tags,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        dueDate: null,
        reminder: {
          enabled: false,
          notifyBefore: 15 * 60 * 1000, // 15 minutes before
          notificationType: 'both',
          sentAt: null,
        },
      };

      state.allIds.push(id);
    },

    updateTask: (state, action) => {
      const { id, changes } = action.payload;

      if (state.byId[id]) {
        Object.assign(state.byId[id], {
          ...changes,
          updatedAt: Date.now(),
        });
      }
    },

    toggleTask: (state, action) => {
      const taskId = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].completed = !state.byId[taskId].completed;
        state.byId[taskId].completedAt = state.byId[taskId].completed
          ? Date.now()
          : null;
        state.byId[taskId].updatedAt = Date.now();
      }
    },

    deleteTask: (state, action) => {
      const taskId = action.payload;

      if (state.byId[taskId]) {
        delete state.byId[taskId];
        state.allIds = state.allIds.filter((id) => id !== taskId);
      }
    },

    reorderTasks: (state, action) => {
      state.allIds = action.payload;
    },

    setTaskDueDate: (state, action) => {
      const { taskId, dueDate } = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].dueDate = dueDate;
        state.byId[taskId].updatedAt = Date.now();
      }
    },

    setTaskReminder: (state, action) => {
      const { taskId, reminderConfig } = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].reminder = {
          ...state.byId[taskId].reminder,
          ...reminderConfig,
          sentAt: null, // Reset sent status when changing reminder
        };
        state.byId[taskId].updatedAt = Date.now();
      }
    },

    markReminderSent: (state, action) => {
      const taskId = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].reminder.sentAt = Date.now();
      }
    },

    setTaskCategories: (state, action) => {
      const { taskId, categories } = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].categories = categories;
        state.byId[taskId].updatedAt = Date.now();
      }
    },

    setTaskTags: (state, action) => {
      const { taskId, tags } = action.payload;

      if (state.byId[taskId]) {
        state.byId[taskId].tags = tags;
        state.byId[taskId].updatedAt = Date.now();
      }
    },

    // Hydrate state from localStorage
    hydrateFromStorage: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  toggleTask,
  deleteTask,
  reorderTasks,
  setTaskDueDate,
  setTaskReminder,
  markReminderSent,
  setTaskCategories,
  setTaskTags,
  hydrateFromStorage,
} = tasksSlice.actions;

export default tasksSlice.reducer;
