import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './store/store';
import { loadPersistedState } from './store/middleware/persistenceMiddleware';
import {
  hydrateFromStorage as hydrateTasksFromStorage,
} from './store/slices/tasksSlice';
import {
  hydrateCategoriesFromStorage,
} from './store/slices/categoriesSlice';
import reportWebVitals from './reportWebVitals';

// Load persisted state and hydrate store
const persistedState = loadPersistedState();
if (persistedState) {
  store.dispatch(hydrateTasksFromStorage(persistedState.tasks));
  store.dispatch(hydrateCategoriesFromStorage(persistedState.categories));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
