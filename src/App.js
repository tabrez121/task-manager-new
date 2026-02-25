import React, { useState } from "react";
import TaskInput from "./components/TaskInput";
import FilterButtons from "./components/FilterButtons";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import SearchBar from "./components/SearchBar";
import CategoryManager from "./components/CategoryManager";
import TaskDetailsModal from "./components/TaskDetailsModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";
import "./styles/app.css";
import "./styles/tasks.css";

const App = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTaskForEdit, setSelectedTaskForEdit] = useState(null);

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <ThemeToggle />
      <main className="app">
        <header className="app-header">
          <h1>📋 Task Manager</h1>
          <button
            className="btn btn-secondary"
            onClick={() => setShowCategories(true)}
            style={{ marginLeft: 'auto' }}
          >
             Categories
          </button>
        </header>

        <section className="controls">
          <TaskInput onOpenForm={() => setShowCreateForm(true)} />
          <SearchBar />
          <FilterButtons />
        </section>

        <TaskList onTaskEdit={setSelectedTaskForEdit} />

        {/* Modals */}
        <CategoryManager
          isOpen={showCategories}
          onClose={() => setShowCategories(false)}
        />

        <TaskDetailsModal
          mode="create"
          isOpen={showCreateForm}
          onClose={() => setShowCreateForm(false)}
        />

        <TaskDetailsModal
          mode="edit"
          taskId={selectedTaskForEdit}
          isOpen={!!selectedTaskForEdit}
          onClose={() => setSelectedTaskForEdit(null)}
        />
      </main>
    </>
  );
};

export default App;
