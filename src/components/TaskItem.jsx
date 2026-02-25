import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggleTask, deleteTask } from "../store/slices/tasksSlice";
import { toast } from "react-toastify";

const TaskItem = ({ task, provided, onEdit }) => {
  const dispatch = useDispatch();
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    let timeout;
    if (isRemoving) {
      timeout = setTimeout(() => dispatch(deleteTask(task.id)), 300);
    }
    return () => clearTimeout(timeout);
  }, [isRemoving, dispatch, task.id]);

  const handleDelete = (e) => {
    e.stopPropagation();
    setIsRemoving(true);
    toast.error("Task deleted!");
  };

  const handleToggle = (e) => {
    e.stopPropagation();
    dispatch(toggleTask(task.id));
    toast.success(task.completed ? "Task marked incomplete" : "Task completed!");
  };

  // Format due date if present
  const formatDueDate = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isTomorrow =
      date.getDate() === tomorrow.getDate() &&
      date.getMonth() === tomorrow.getMonth() &&
      date.getFullYear() === tomorrow.getFullYear();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    return date.toLocaleDateString();
  };

  // Format created date
  const formatCreatedDate = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  const isOverdue = task.dueDate && task.dueDate < Date.now() && !task.completed;
  const dueDateString = formatDueDate(task.dueDate);

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
      ref={provided?.innerRef}
      {...provided?.draggableProps}
      {...provided?.dragHandleProps}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggle}
        onClick={(e) => e.stopPropagation()}
        className="task-checkbox"
      />

      <div className="task-content">
        <span className="task-text">{task.text}</span>
        {task.description && (
          <span className="task-description">{task.description}</span>
        )}
        {formatCreatedDate(task.createdAt) && (
          <span className="task-created-date">
            📅 Created: {formatCreatedDate(task.createdAt)}
          </span>
        )}
        {dueDateString && (
          <span className={`task-due-date ${isOverdue ? "overdue" : ""}`}>
            📅 {dueDateString}
          </span>
        )}
        {task.categories && task.categories.length > 0 && (
          <div className="task-categories">
            {task.categories.map((cat) => (
              <span key={cat} className="category-badge">
                {cat}
              </span>
            ))}
          </div>
        )}
      </div>

      <button className="edit" onClick={(e) => {
        e.stopPropagation();
        onEdit?.();
      }}>
        ✎
      </button>

      <button className="delete" onClick={handleDelete}>
        ✕
      </button>
    </div>
  );
};

export default TaskItem;
