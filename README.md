# 📝 Task Manager – React Project  
A modern, beautiful, and fully responsive **Task Manager Application** built using **React**, **Context API**, **Custom Hooks**, and **@hello-pangea/dnd** for drag-and-drop functionality.

This project covers all required assignment features and includes additional enhancements such as toast notifications, animations, task selection, and theme toggling.

---

# 📸 Screenshots
### 🏠 Home Screen (Light Mode)
<img width="928" height="345" alt="Homepage light" src="https://github.com/user-attachments/assets/1b82c219-9ef9-44dd-84eb-ba835315db2f" />


### 🌙 Home Screen (Dark Mode)
<img width="866" height="359" alt="homepage dark" src="https://github.com/user-attachments/assets/25b89eda-2bb3-440f-a06f-566ae24e971f" />


### 📝 Adding Tasks
<img width="854" height="362" alt="add task" src="https://github.com/user-attachments/assets/d8ac2dc0-c65e-4025-98d4-a23d764be2c7" />


### ✔️ Completed Task View  
<img width="800" height="349" alt="select task" src="https://github.com/user-attachments/assets/df098969-cd4f-46df-bf1e-ce12bfc51195" />


### 🔍 Filter Options – All / Completed / Pending
<img width="665" height="316" alt="complete filter task" src="https://github.com/user-attachments/assets/6f43297b-ef39-4057-a631-96feab4e3d81" />

<img width="679" height="265" alt="pending filter task" src="https://github.com/user-attachments/assets/2c59b4a8-8371-4e89-9b08-26c6b72fccf1" />


### ↕️ Drag & Drop Reordering (Hello Pangea DnD)
<img width="638" height="284" alt="drag" src="https://github.com/user-attachments/assets/10791b1c-7b5a-4ac0-931f-bc87184cfa33" />


### 🗑 Deleting a Task (with animation)
<img width="791" height="283" alt="delete task" src="https://github.com/user-attachments/assets/22da7176-ba37-40d2-abf4-8dd7e5e7e115" />


### ✨ Task Seleted
<img width="619" height="313" alt="task selection 1" src="https://github.com/user-attachments/assets/0d6d7e50-82ae-4e9d-9853-dd6776c4f514" />


### ✨ Toast Notifications 
<img width="278" height="83" alt="toast task created" src="https://github.com/user-attachments/assets/eaaebffc-42cf-42a4-b365-9173e7c087cb" />
<img width="263" height="68" alt="toast task completed" src="https://github.com/user-attachments/assets/06e2ad27-58d6-4b98-82d4-052f1d221999" />
<img width="254" height="66" alt="toast task deletd" src="https://github.com/user-attachments/assets/d3fe7780-bcfa-4da6-a16c-f068005614c3" />



## 🚀 Features

### ✅ **Basic Functionality**
- ➕ **Add Tasks** (with input validation)
- ✔️ **Mark Tasks as Completed** (checkbox UI)
- 🗑 **Delete Tasks** (with animation)
- 🔍 **Filter Tasks**  
  - **All**
  - **Completed**
  - **Pending**
- 💾 **Persistent Storage** using Local Storage

---

## ⚛️ **React Concepts Implemented**

### 🔧 **Custom Hook – `useLocalStorage()`**
A fully reusable hook for:
- Saving tasks to localStorage  
- Restoring tasks on refresh  
- Auto-sync with state

### 🧠 **Context API**
Manages global state for:
- Tasks  
- Filters  
- Selection  
- Drag-and-drop order  
- All CRUD operations  

No prop-drilling!

### ⚡ **Performance Optimization**
- `React.memo` → Prevents unnecessary re-renders  
- `useCallback` → Optimizes event handlers  
- `useMemo` → Optimizes computed filtered tasks  
- Context partitioning → Efficient updates  

---

## 🎨 **UI & CSS Features**

### ☀️🌙 **Dark Mode / Light Mode**
- Theme toggle button  
- Colors handled with CSS variables  
- Fully responsive to theme changes

### ✨ **Animations**
Includes smooth, modern animations for:
- Task adding  
- Task removing  
- Hover elevation  
- Dragging shadow + rotation  
- Empty state fade animation  
- Selected task highlight  

### 📱 **Responsive Design**
- Mobile-first  
- Fully responsive task layout  
- Touch-friendly drag-and-drop  

---

## 🧲 **Drag and Drop – @hello-pangea/dnd**
- Drag tasks to reorder  
- Smooth animation  
- Stable React 19 compatibility  
- Works with filters & context  
- Styled drag shadow + scale effect  

----

## 🔔 **Toast Notifications**
Using **react-toastify**:
- Task added  
- Task deleted  
- Task completed  
- Task selected  

---

## 🖼 **Task Selection Feature**
- Click task → highlights it  
- Selected style works in both themes  
- Does not interfere with completed tasks  
- Great UX improvement  

---

## 📂 **Project Structure**

src/
│── components/
│ ├── TaskInput.jsx
│ ├── TaskList.jsx
│ ├── TaskItem.jsx
│ ├── SortableTask.jsx (if used)
│
│── context/
│ └── TaskContext.jsx
│
│── hooks/
│ └── useLocalStorage.js
│
│── styles/
│ ├── tasks.css
│ ├── theme.css
│
│── App.js
│── index.js


---

## 🛠️ **Technologies Used**
- **React 19**
- **Context API**
- **Custom Hooks**
- **@hello-pangea/dnd** (Drag and Drop)
- **React Toastify**
- **CSS3 Animations**
- **Local Storage API**

---

## 📦 **Installation & Setup**

npm install
npm start
