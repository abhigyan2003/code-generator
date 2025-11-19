// script.js
// Todo App implementation
// ------------------------------------------------------------
// Task class definition
class Task {
  constructor(id, text, completed = false) {
    this.id = id;
    this.text = text;
    this.completed = completed;
  }
}

// ------------------------------------------------------------
// TaskManager module (IIFE)
const TaskManager = (function () {
  const STORAGE_KEY = 'colorfulTodoTasks';
  let tasks = [];
  let nextId = 1; // simple incremental id

  // Load tasks from localStorage
  function load() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        const parsed = JSON.parse(data);
        tasks = parsed.map(t => new Task(t.id, t.text, t.completed));
        // set nextId to max existing id + 1
        const maxId = tasks.reduce((max, t) => (t.id > max ? t.id : max), 0);
        nextId = maxId + 1;
      } catch (e) {
        console.error('Failed to parse tasks from storage', e);
        tasks = [];
      }
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function addTask(text) {
    if (!text || !text.trim()) return;
    const task = new Task(nextId++, text.trim());
    tasks.push(task);
    save();
    return task;
  }

  function editTask(id, newText) {
    const task = tasks.find(t => t.id === id);
    if (task && newText && newText.trim()) {
      task.text = newText.trim();
      save();
    }
  }

  function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      tasks.splice(index, 1);
      save();
    }
  }

  function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
      task.completed = !task.completed;
      save();
    }
  }

  function reorderTasks(sourceId, targetId) {
    if (sourceId === targetId) return;
    const sourceIndex = tasks.findIndex(t => t.id === sourceId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);
    if (sourceIndex === -1) return;
    const [moved] = tasks.splice(sourceIndex, 1);
    // If target not found (e.g., dropped on empty area), push to end
    if (targetIndex === -1) {
      tasks.push(moved);
    } else {
      // Insert before target if source was after target, otherwise after target
      const insertIndex = sourceIndex < targetIndex ? targetIndex : targetIndex;
      tasks.splice(insertIndex, 0, moved);
    }
    save();
  }

  function getTasks(filter = 'all') {
    switch (filter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        return tasks.slice(); // return copy of all
    }
  }

  // Public API
  return {
    load,
    save,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    reorderTasks,
    getTasks,
  };
})();

// ------------------------------------------------------------
// UI module
const UI = (function () {
  const taskListEl = document.getElementById('task-list');
  const newTaskInput = document.getElementById('new-task-input');
  const addTaskBtn = document.getElementById('add-task-btn');
  const filterNav = document.getElementById('filter-nav');
  const themeSelect = document.getElementById('theme-select');

  let currentFilter = 'all';

  // Helper to create a task <li> element
  function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.setAttribute('draggable', 'true');
    li.dataset.id = task.id;
    if (task.completed) li.classList.add('completed');

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'complete-checkbox';
    checkbox.checked = task.completed;
    checkbox.dataset.id = task.id;
    li.appendChild(checkbox);

    // Text span
    const span = document.createElement('span');
    span.textContent = task.text;
    span.className = 'task-text';
    li.appendChild(span);

    // Buttons container
    const btnContainer = document.createElement('div');
    btnContainer.className = 'task-buttons';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.dataset.id = task.id;
    btnContainer.appendChild(editBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.dataset.id = task.id;
    btnContainer.appendChild(deleteBtn);

    li.appendChild(btnContainer);

    // Drag events
    li.addEventListener('dragstart', onDragStart);
    li.addEventListener('dragover', onDragOver);
    li.addEventListener('dragleave', onDragLeave);
    li.addEventListener('drop', onDrop);
    li.addEventListener('dragend', onDragEnd);

    return li;
  }

  // Render tasks based on current filter
  function renderTasks(filter = currentFilter) {
    currentFilter = filter;
    // Clear list
    taskListEl.innerHTML = '';
    const tasks = TaskManager.getTasks(filter);
    tasks.forEach(task => {
      const el = createTaskElement(task);
      taskListEl.appendChild(el);
    });
  }

  // Event Handlers
  function handleAddTask() {
    const text = newTaskInput.value;
    if (text.trim()) {
      TaskManager.addTask(text);
      newTaskInput.value = '';
      renderTasks();
    }
  }

  function handleEditClick(e) {
    if (!e.target.matches('.edit-btn')) return;
    const id = Number(e.target.dataset.id);
    const task = TaskManager.getTasks().find(t => t.id === id);
    const newText = prompt('Edit task:', task ? task.text : '');
    if (newText !== null) {
      TaskManager.editTask(id, newText);
      renderTasks();
    }
  }

  function handleDeleteClick(e) {
    if (!e.target.matches('.delete-btn')) return;
    const id = Number(e.target.dataset.id);
    TaskManager.deleteTask(id);
    renderTasks();
  }

  function handleCheckboxChange(e) {
    if (!e.target.matches('.complete-checkbox')) return;
    const id = Number(e.target.dataset.id);
    TaskManager.toggleComplete(id);
    renderTasks();
  }

  function handleFilterClick(e) {
    const btn = e.target.closest('button[data-filter]');
    if (!btn) return;
    const filter = btn.dataset.filter;
    renderTasks(filter);
  }

  function handleThemeChange(e) {
    const selected = e.target.value; // e.g., 'light' or 'dark'
    const className = `theme-${selected}`;
    document.documentElement.className = className;
    localStorage.setItem('colorfulTodoTheme', className);
  }

  // Drag‑and‑drop handlers
  let dragSourceId = null;

  function onDragStart(e) {
    dragSourceId = Number(e.currentTarget.dataset.id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', dragSourceId);
    e.currentTarget.classList.add('dragging');
  }

  function onDragOver(e) {
    e.preventDefault(); // necessary for drop
    e.currentTarget.classList.add('drag-over');
    e.dataTransfer.dropEffect = 'move';
  }

  function onDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
  }

  function onDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const targetId = Number(e.currentTarget.dataset.id);
    if (dragSourceId !== null && dragSourceId !== targetId) {
      TaskManager.reorderTasks(dragSourceId, targetId);
      renderTasks();
    }
    dragSourceId = null;
  }

  function onDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    // Clean any leftover drag‑over classes
    const items = taskListEl.querySelectorAll('.drag-over');
    items.forEach(item => item.classList.remove('drag-over'));
  }

  // Initialization
  function init() {
    // Load persisted tasks
    TaskManager.load();

    // Apply saved theme
    const savedTheme = localStorage.getItem('colorfulTodoTheme');
    if (savedTheme) {
      document.documentElement.className = savedTheme;
      // also set selector value accordingly
      const match = savedTheme.match(/^theme-(.*)$/);
      if (match) themeSelect.value = match[1];
    }

    // Initial render
    renderTasks('all');

    // Event listeners
    addTaskBtn.addEventListener('click', handleAddTask);
    // also handle Enter key on input (form submit)
    newTaskInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleAddTask();
      }
    });
    taskListEl.addEventListener('click', handleEditClick);
    taskListEl.addEventListener('click', handleDeleteClick);
    taskListEl.addEventListener('change', handleCheckboxChange);
    filterNav.addEventListener('click', handleFilterClick);
    themeSelect.addEventListener('change', handleThemeChange);
  }

  // Expose only init for external call (if needed)
  return {
    init,
    renderTasks,
  };
})();

// Kick‑off the app
document.addEventListener('DOMContentLoaded', () => {
  UI.init();
});
