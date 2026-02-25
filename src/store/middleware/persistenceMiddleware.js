const PERSIST_KEY = 'task-manager-redux';
const PERSIST_VERSION = 1;
const THROTTLE_DELAY = 1000; // 1 second debounce

let saveTimeout;

const persistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  // Throttled save to localStorage
  clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      const state = storeAPI.getState();

      const persistedState = {
        version: PERSIST_VERSION,
        timestamp: Date.now(),
        data: {
          tasks: state.tasks,
          categories: state.categories,
          // Note: filters are NOT persisted (transient UI state)
        },
      };

      localStorage.setItem(PERSIST_KEY, JSON.stringify(persistedState));
    } catch (error) {
      console.error('Failed to persist state to localStorage:', error);
    }
  }, THROTTLE_DELAY);

  return result;
};

export const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem(PERSIST_KEY);
    if (!saved) return null;

    const parsed = JSON.parse(saved);

    // Version check for future migrations
    if (parsed.version !== PERSIST_VERSION) {
      console.warn('Persisted state version mismatch, discarding...');
      localStorage.removeItem(PERSIST_KEY);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error('Failed to load persisted state:', error);
    return null;
  }
};

export default persistenceMiddleware;
