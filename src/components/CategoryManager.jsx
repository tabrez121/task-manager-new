import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  updateCategory,
  deleteCategory,
} from "../store/slices/categoriesSlice";
import { selectAllCategories } from "../store/selectors";
import { toast } from "react-toastify";

const COLORS = [
  "#FF6B6B",
  "#4ECDC4",
  "#45B7D1",
  "#FFA07A",
  "#98D8C8",
  "#F7DC6F",
  "#BB8FCE",
  "#85C1E2",
];

const CategoryManager = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const handleAddCategory = useCallback(() => {
    if (!newCategoryName.trim()) return;

    dispatch(
      addCategory({
        id: `cat-${Date.now()}`,
        name: newCategoryName,
        color: selectedColor,
      })
    );

    toast.success("Category added!");
    setNewCategoryName("");
    setSelectedColor(COLORS[0]);
  }, [newCategoryName, selectedColor, dispatch]);

  const handleDeleteCategory = useCallback(
    (categoryId) => {
      dispatch(deleteCategory(categoryId));
      toast.success("Category deleted!");
    },
    [dispatch]
  );

  const handleEditCategory = useCallback(
    (categoryId, currentName) => {
      setEditingId(categoryId);
      setEditingName(currentName);
    },
    []
  );

  const handleSaveEdit = useCallback(
    (categoryId) => {
      if (!editingName.trim()) return;

      dispatch(
        updateCategory({
          id: categoryId,
          changes: { name: editingName },
        })
      );

      toast.success("Category updated!");
      setEditingId(null);
      setEditingName("");
    },
    [editingName, dispatch]
  );

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Manage Categories</h2>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Add Category Form */}
          <div className="add-category-form">
            <input
              type="text"
              placeholder="New category name..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="category-input"
            />

            <div className="color-picker">
              {COLORS.map((color) => (
                <button
                  key={color}
                  className={`color-option ${
                    selectedColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>

            <button
              className="btn btn-primary"
              onClick={handleAddCategory}
              disabled={!newCategoryName.trim()}
            >
              Add Category
            </button>
          </div>

          {/* Categories List */}
          <div className="categories-list">
            {categories.length === 0 ? (
              <p className="empty-message">No categories yet</p>
            ) : (
              categories.map((category) => (
                <div key={category.id} className="category-item">
                  <div
                    className="category-color"
                    style={{ backgroundColor: category.color }}
                  />

                  {editingId === category.id ? (
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="category-edit-input"
                      autoFocus
                    />
                  ) : (
                    <span className="category-name">{category.name}</span>
                  )}

                  <div className="category-actions">
                    {editingId === category.id ? (
                      <>
                        <button
                          className="btn btn-small btn-success"
                          onClick={() => handleSaveEdit(category.id)}
                        >
                          ✓
                        </button>
                        <button
                          className="btn btn-small btn-secondary"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-small btn-secondary"
                          onClick={() =>
                            handleEditCategory(category.id, category.name)
                          }
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-small btn-danger"
                          onClick={() => handleDeleteCategory(category.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;
