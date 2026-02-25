import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

import { selectFilteredTasks } from "../store/selectors";
import { reorderTasks } from "../store/slices/tasksSlice";
import TaskItem from "./TaskItem";

const TaskList = ({ onTaskEdit }) => {
  const dispatch = useDispatch();
  const filteredTasks = useSelector(selectFilteredTasks);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const sourceIndex = result.source.index;
      const destIndex = result.destination.index;

      if (sourceIndex === destIndex) return;

      // Reorder the tasks array
      const newOrder = Array.from(filteredTasks);
      const [removed] = newOrder.splice(sourceIndex, 1);
      newOrder.splice(destIndex, 0, removed);

      // Update with new task IDs array
      const reorderedIds = newOrder.map((task) => task.id);
      dispatch(reorderTasks(reorderedIds));
    },
    [filteredTasks, dispatch]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Show empty message when no tasks */}
            {filteredTasks.length === 0 && (
              <div className="empty">
                No tasks yet — add your first task ✨
              </div>
            )}

            {/* Render task list */}
            {filteredTasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={String(task.id)}
                index={index}
              >
                {(dragProvided) => (
                  <TaskItem
                    task={task}
                    provided={dragProvided}
                    onEdit={() => onTaskEdit?.(task.id)}
                  />
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TaskList;
