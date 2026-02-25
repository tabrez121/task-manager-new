import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../store/slices/filtersSlice";
import { selectSearchQuery } from "../store/selectors";

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);

  const handleSearchChange = useCallback(
    (e) => {
      dispatch(setSearchQuery(e.target.value));
    },
    [dispatch]
  );

  const handleClearSearch = useCallback(() => {
    dispatch(setSearchQuery(""));
  }, [dispatch]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="🔍 Search tasks..."
        value={searchQuery}
        onChange={handleSearchChange}
        aria-label="Search tasks"
      />
      {searchQuery && (
        <button className="search-clear" onClick={handleClearSearch}>
          ✕
        </button>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
