import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusFilter } from "../store/slices/filtersSlice";
import { selectFilterStatus } from "../store/selectors";

const FilterButtons = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilterStatus);

  const handleSetFilter = useCallback(
    (val) => () => {
      dispatch(setStatusFilter(val));
    },
    [dispatch]
  );

  return (
    <div className="filters" role="tablist" aria-label="Task filters">
      <button
        className={filter === "all" ? "active" : ""}
        onClick={handleSetFilter("all")}
      >
        All
      </button>
      <button
        className={filter === "completed" ? "active" : ""}
        onClick={handleSetFilter("completed")}
      >
        Completed
      </button>
      <button
        className={filter === "pending" ? "active" : ""}
        onClick={handleSetFilter("pending")}
      >
        Pending
      </button>
    </div>
  );
};

export default React.memo(FilterButtons);
