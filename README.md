# 📝 Task Manager – React Project
A modern, beautiful, and fully responsive **Task Manager Application** built using **React**, **Redux Toolkit**, **@hello-pangea/dnd** for drag-and-drop functionality, and advanced features like task scheduling, reminders, categories, and search.

This project implements a complete task management system with all required features and comprehensive enhancements including due dates, reminders, categories, descriptions, and advanced filtering.

---

# 📸 Screenshots
### 🏠 Home Screen (Light Mode)
<img width="928" height="345" alt="Homepage light" src="https://github.com/user-attachments/assets/1b82c219-9ef9-44dd-84eb-ba835315db2f" />


### 🌙 Home Screen (Dark Mode)
<img width="866" height="359" alt="homepage dark" src="https://github.com/user-attachments/assets/25b89eda-2bb3-440f-a06f-566ae24e971f" />


### 📝 Create Task Modal (Full Details)
Modal form includes: Title, Description, Created Date, Status, Due Date, Categories, and Reminders

### ✔️ Task List with Full Details
Tasks now display: Title, Description, Created Date, Due Date, and Category Badges

### 🔍 Search & Filter Options
- Search by title and description
- Filter by All / Completed / Pending
- Filter by Categories

### ↕️ Drag & Drop Reordering
Smooth drag-and-drop with @hello-pangea/dnd

### 🏷️ Categories Management
Organize tasks with color-coded categories

### 🔔 Reminder Notifications
Due date reminders with toast and browser notifications

---

## 🚀 Features

### ✅ **Core Task Management**
- ➕ **Create Tasks** with modal form (Title, Description, Categories, Due Date)
- ✔️ **Mark Tasks as Completed** (with status tracking)
- 🗑 **Delete Tasks** (with animation)
- ✏️ **Edit Tasks** (all fields editable)
- 💾 **Persistent Storage** using Redux with localStorage sync

### 📅 **Due Dates & Scheduling**
- 📅 **Set Due Dates** for tasks
- 🕐 **Track Created Date** automatically
- ⏰ **Reminders** configurable (5 min, 15 min, 30 min, 1 hour, 1 day)
- 🔴 **Overdue Indicator** with red highlighting
- 📍 **Smart Date Display** (Today, Tomorrow, or date format)

### 🔔 **Notifications & Reminders**
- 🔊 **Browser Notifications** when due date approaches
- 🍞 **Toast Notifications** for all actions
- ⚙️ **Configurable Notification Types** (Browser only, Toast only, or Both)

### 🏷️ **Categories & Tags**
- 🎨 **Create Color-Coded Categories**
- 🏷️ **Assign Multiple Categories** to tasks
- 🔍 **Filter Tasks by Category**
- 🎯 **Category Management Panel** (Add, Edit, Delete)

### 🔍 **Search & Filtering**
- 🔎 **Full-Text Search** across task titles and descriptions
- 🔽 **Status Filters** (All / Completed / Pending)
- 📂 **Category Filters** (filter by single or multiple categories)
- ⚡ **Real-Time Search** with live results

---

## ⚛️ **React Concepts Implemented**

### 🏪 **Redux Toolkit State Management**
Complete Redux migration with:
- **Normalized State** for optimal performance
- **Slices**: `tasksSlice`, `filtersSlice`, `categoriesSlice`
- **Selectors** with Reselect for memoization
- **Middleware**: Custom persistence & reminder middleware
- **DevTools Integration** for debugging

### 🎯 **Memoized Selectors**
- `selectAllTasks()` – Get all tasks
- `selectFilteredTasks()` – Apply status filter
- `selectSearchResults()` – Fuzzy search matching
- `selectFilteredAndSearchedTasks()` – Combined filtering
- `selectTasksByCategory()` – Filter by category
- `selectUpcomingReminders()` – Get tasks needing reminders

### ⚡ **Performance Optimization**
- `React.memo` – Prevents unnecessary re-renders
- `useCallback` – Optimized event handlers
- Reselect – Memoized selectors prevent recalculations
- Normalized Redux state – O(1) task lookups

### 🔄 **Custom Middleware**
- **Persistence Middleware** – Throttled localStorage sync (1000ms debounce)
- **Reminder Middleware** – Checks reminders every 30 seconds

---

## 🎨 **UI & CSS Features**

### ☀️🌙 **Dark Mode / Light Mode**
- Theme toggle button in top-right corner
- All colors via CSS variables
- Enhanced dark mode: Due dates have highlighted background for visibility
- Smooth transitions between themes

### ✨ **Animations**
- Task adding with scale and fade-in
- Task removal with slide-out animation
- Hover elevation effects
- Dragging shadow + rotation effects
- Modal fade and slide-up animations
- Empty state fade animation

### 📖 **Comprehensive Task Display**
- **Title** (primary task name)
- **Description** (optional detailed notes)
- **Created Date** (auto-generated, read-only)
- **Due Date** (with calendar icon)
- **Category Badges** (color-coded)
- **Completion Status** (checkmark)

### 📱 **Responsive Design**
- Mobile-first approach
- Fully responsive task layout
- Touch-friendly drag-and-drop
- Modal responsive on small screens
- Optimized for all screen sizes

---

## 🧲 **Drag and Drop – @hello-pangea/dnd**
- Drag tasks to reorder within list
- Smooth animation during drag
- Stable React 19 compatibility
- Works with all filters applied
- Visual feedback (shadow + scale)

---

## 🛠️ **Task Fields & Data Structure**

Each task contains:
```javascript
{
  id: string,                    // Unique identifier
  text: string,                  // Task title (required)
  description: string,           // Optional task details
  completed: boolean,            // Completion status
  completedAt: timestamp,        // When completed
  createdAt: timestamp,          // When task was created
  dueDate: timestamp,            // Optional due date
  categories: string[],          // Array of category IDs
  reminder: {
    enabled: boolean,            // Reminder active?
    notifyBefore: number,        // Milliseconds before due date
    notificationType: string,    // 'toast' | 'browser' | 'both'
    sentAt: timestamp           // When reminder was sent
  }
}
```

---

## 📖 **Form Validation & UX**

### Create Task Modal
- ✅ **Title** (required, marked with *)
- ✅ **Description** (optional)
- ✅ **Created Date** (auto-filled, read-only)
- ✅ **Status** (Mark as Completed checkbox)
- ✅ **Due Date** (optional date picker)
- ✅ **Categories** (multi-select with colors)
- ✅ **Reminders** (enable/disable with options)

### Smart Button State
- **Create Mode**: Button enabled when title is filled
- **Edit Mode**: Button only enabled when changes detected
- Call-to-action text: "Create Task" or "Save Changes"
- Tooltip guidance for users

---

## 📂 **Project Structure**

```
src/
├── store/
│   ├── store.js
│   ├── slices/
│   │   ├── tasksSlice.js
│   │   ├── filtersSlice.js
│   │   └── categoriesSlice.js
│   ├── middleware/
│   │   ├── persistenceMiddleware.js
│   │   └── reminderMiddleware.js
│   └── selectors/
│       └── index.js
├── components/
│   ├── TaskInput.jsx
│   ├── TaskList.jsx
│   ├── TaskItem.jsx
│   ├── TaskDetailsModal.jsx
│   ├── SearchBar.jsx
│   ├── FilterButtons.jsx
│   ├── CategoryManager.jsx
│   └── ThemeToggle.jsx
├── styles/
│   ├── theme.css
│   ├── app.css
│   └── tasks.css
├── App.js
└── index.js
```

---

## 🛠️ **Technologies Used**
- **React 19** – UI library
- **Redux Toolkit** – State management (with Thunk middleware)
- **react-redux** – React bindings for Redux
- **Reselect** – Memoized selectors
- **@hello-pangea/dnd** – Drag and drop
- **React Toastify** – Toast notifications
- **Fuse.js** – Fuzzy search (if used)
- **date-fns** – Date formatting utilities
- **CSS3** – Animations & styling
- **Local Storage API** – Persistence

---

## 📦 **Installation & Setup**

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

## 🔑 **Key Implementation Details**

### Redux Store Setup
```
State: {
  tasks: {
    byId: { taskId: taskObject },
    allIds: [taskId1, taskId2, ...]
  },
  filters: { status, search, category },
  categories: { byId, allIds }
}
```

### Persistence Strategy
- Tasks and categories auto-saved to localStorage
- Throttled to prevent excessive writes
- Version migrations supported for future schema changes

### Reminder System
- Middleware checks every 30 seconds
- Triggers browser notifications if permission granted
- Toast notifications always shown
- Gracefully handles no browser notification support

### Search Implementation
- Real-time as-you-type searching
- Searches across title and description
- Instant feedback with result count
- Clear button to reset search

---

## ✨ **Recent Enhancements**

### Version 2.0 – Redux Migration & Features
- ✅ Migrated from Context API to Redux Toolkit
- ✅ Added modal-based task creation
- ✅ Implemented due dates and reminders
- ✅ Added categories/tags system
- ✅ Built search functionality
- ✅ Enhanced dark mode visibility
- ✅ Added task descriptions
- ✅ Tracking of creation dates
- ✅ Comprehensive form validation
- ✅ Smart button state management

---

## 🎯 **Browser Support**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 **License**
Open source project for educational purposes.
