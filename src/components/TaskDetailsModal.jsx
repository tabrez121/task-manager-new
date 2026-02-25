import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setTaskReminder } from "../store/slices/tasksSlice";
import { selectTaskById, selectAllCategories } from "../store/selectors";
import { toast } from "react-toastify";

const TaskDetailsModal = ({ mode = "edit", taskId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const task = useSelector((state) => mode === "edit" ? selectTaskById(taskId)(state) : null);
  const allCategories = useSelector(selectAllCategories);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderMinutes, setReminderMinutes] = useState(15);
  const [notificationType, setNotificationType] = useState("both");
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdDate, setCreatedDate] = useState("");

  // Validation flag - Title is mandatory
  const isValid = title.trim().length > 0;

  // Initialize from task for edit mode, or reset for create mode
  useEffect(() => {
    if (mode === "create" && isOpen) {
      // Reset form for creation
      setTitle("");
      setDescription("");
      setDueDate("");
      setCreatedDate(new Date().toISOString().split("T")[0]); // Today's date
      setSelectedCategories([]);
      setIsCompleted(false);
      setReminderEnabled(false);
      setReminderMinutes(15);
      setNotificationType("both");
    } else if (mode === "edit" && task && isOpen) {
      // Initialize from task for editing
      setTitle(task.text);
      setDescription(task.description || "");
      setDueDate(
        task.dueDate
          ? new Date(task.dueDate).toISOString().split("T")[0]
          : ""
      );
      setCreatedDate(
        task.createdAt
          ? new Date(task.createdAt).toISOString().split("T")[0]
          : ""
      );
      setSelectedCategories(task.categories || []);
      setIsCompleted(task.completed || false);
      setReminderEnabled(task.reminder?.enabled || false);
      setReminderMinutes(
        (task.reminder?.notifyBefore || 15 * 60 * 1000) / (60 * 1000)
      );
      setNotificationType(task.reminder?.notificationType || "both");
    }
  }, [mode, task, isOpen]);

  const handleSave = useCallback(() => {
    // Validate title - required for both create and edit
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (mode === "create") {
      // Create new task
      const newTask = {
        id: `task-${Date.now()}`, // Generate unique ID for new task
        text: title.trim(),
        description,
        categories: selectedCategories,
        completed: isCompleted,
      };

      if (dueDate) {
        const dueDateTimestamp = new Date(`${dueDate}T00:00:00`).getTime();
        newTask.dueDate = dueDateTimestamp;
      }

      dispatch(addTask(newTask));
      toast.success("Task created!");
      onClose();
    } else if (mode === "edit") {
      // Update existing task - title is also required
      if (!title.trim()) {
        toast.error("Title is required");
        return;
      }

      const changes = {
        text: title.trim(),
        description,
        categories: selectedCategories,
        completed: isCompleted,
      };

      if (dueDate) {
        const dueDateTimestamp = new Date(`${dueDate}T00:00:00`).getTime();
        changes.dueDate = dueDateTimestamp;
      } else {
        changes.dueDate = null;
      }

      // Update reminder
      if (reminderEnabled && dueDate) {
        dispatch(
          setTaskReminder({
            taskId,
            reminderConfig: {
              enabled: true,
              notifyBefore: reminderMinutes * 60 * 1000,
              notificationType,
            },
          })
        );
      } else if (!reminderEnabled) {
        // Disable reminder if unchecked
        dispatch(
          setTaskReminder({
            taskId,
            reminderConfig: {
              enabled: false,
              notifyBefore: 15 * 60 * 1000,
              notificationType,
            },
          })
        );
      }

      dispatch(updateTask({ id: taskId, changes }));
      toast.success("Task updated!");
      onClose();
    }
  }, [
    mode,
    title,
    taskId,
    dispatch,
    description,
    dueDate,
    selectedCategories,
    isCompleted,
    reminderEnabled,
    reminderMinutes,
    notificationType,
    onClose,
  ]);

  const toggleCategory = useCallback((categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  }, []);

  // Don't render if not open
  if (!isOpen) return null;

  // For edit mode, show error if task not found
  if (mode === "edit" && !task) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Error</h2>
            <button className="modal-close" onClick={onClose}>
              ✕
            </button>
          </div>
          <div className="modal-body">
            <p>The task could not be found. It may have been deleted.</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isCreateMode = mode === "create";
  const modalTitle = isCreateMode ? "Create New Task" : "Task Details";
  const submitButtonText = isCreateMode ? "Create Task" : "Save Changes";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{modalTitle}</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Task Title - Mandatory */}
          <div className="form-group">
            <label htmlFor="taskTitle">
              Title <span style={{color: 'var(--danger)'}}>*</span>
              <span style={{fontSize: '0.75rem', marginLeft: '4px', color: 'var(--muted)'}}>Required</span>
            </label>
            <input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
              style={{
                borderColor: !title.trim() ? 'rgba(239, 68, 68, 0.3)' : 'rgba(37, 99, 235, 0.15)',
              }}
            />
            {!title.trim() && (
              <span style={{fontSize: '0.8rem', color: 'var(--danger)', marginTop: '4px', display: 'block'}}>
                This field is required
              </span>
            )}
          </div>

          {/* Created Date - Read-only */}
          <div className="form-group">
            <label htmlFor="createdDate">Created Date</label>
            <input
              id="createdDate"
              type="date"
              value={createdDate}
              disabled
              style={{
                opacity: 0.7,
                cursor: 'not-allowed',
                backgroundColor: 'rgba(37, 99, 235, 0.05)',
              }}
            />
            <span style={{fontSize: '0.8rem', color: 'var(--muted)', marginTop: '4px', display: 'block'}}>
              {mode === "create"
                ? "Today's date - task creation date"
                : "Auto-generated when task was created"}
            </span>
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">
              <input
                id="status"
                type="checkbox"
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
              />
              Mark as Completed
            </label>
          </div>

          {/* Description - Optional */}
          <div className="form-group">
            <label htmlFor="description">
              Description
              <span style={{fontSize: '0.75rem', marginLeft: '4px', color: 'var(--muted)'}}>Optional</span>
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              rows="3"
            />
          </div>

          {/* Due Date - Optional */}
          <div className="form-group">
            <label htmlFor="dueDate">
              Due Date
              <span style={{fontSize: '0.75rem', marginLeft: '4px', color: 'var(--muted)'}}>Optional</span>
            </label>
            <input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Reminder Settings */}
          {dueDate && (
            <div className="form-group">
              <label htmlFor="reminderEnabled">
                <input
                  id="reminderEnabled"
                  type="checkbox"
                  checked={reminderEnabled}
                  onChange={(e) => setReminderEnabled(e.target.checked)}
                />
                Enable Reminder
              </label>

              {reminderEnabled && (
                <div className="reminder-settings">
                  <div className="form-row">
                    <label htmlFor="reminderMinutes">Notify Before</label>
                    <select
                      id="reminderMinutes"
                      value={reminderMinutes}
                      onChange={(e) =>
                        setReminderMinutes(Number(e.target.value))
                      }
                    >
                      <option value="5">5 minutes</option>
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="1440">1 day</option>
                    </select>
                  </div>

                  <div className="form-row">
                    <label htmlFor="notificationType">Notification Type</label>
                    <select
                      id="notificationType"
                      value={notificationType}
                      onChange={(e) => setNotificationType(e.target.value)}
                    >
                      <option value="both">Browser & Toast</option>
                      <option value="browser">Browser Only</option>
                      <option value="toast">Toast Only</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categories - Optional */}
          <div className="form-group">
            <label>
              Categories
              <span style={{fontSize: '0.75rem', marginLeft: '4px', color: 'var(--muted)'}}>Optional</span>
            </label>
            <div className="categories-select">
              {allCategories.length === 0 ? (
                <p className="empty-message">No categories available</p>
              ) : (
                allCategories.map((category) => (
                  <label key={category.id} className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                    />
                    <span
                      className="category-color"
                      style={{ backgroundColor: category.color }}
                    />
                    {category.name}
                  </label>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!isValid}
            title={!isValid ? "Please fill in the required fields (Title)" : ""}
            style={{
              opacity: !isValid ? 0.5 : 1,
              cursor: !isValid ? 'not-allowed' : 'pointer',
            }}
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
