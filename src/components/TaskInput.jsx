
import React from "react";

const TaskInput = ({ onOpenForm }) => {
  return (
    <button
      className="btn btn-primary task-input-button"
      onClick={onOpenForm}
      aria-label="Add new task"
    >
      ➕ Add Task
    </button>
  );
};

export default React.memo(TaskInput);
