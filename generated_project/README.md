# To-Do List Web App

## Project Overview
A lightweight, client‑side **To‑Do List** application built with plain **HTML**, **CSS**, and **JavaScript**.  The app runs entirely in the browser—no server, database, or build tools are required.  Users can create, edit, delete, complete, filter, and reorder tasks via drag‑and‑drop, and switch between light and dark themes.

---

## Tech Stack
- **HTML5** – Semantic markup for the structure of the app.
- **CSS3** – Custom styling, CSS variables for colour theming, and responsive layout.
- **JavaScript (ES6+)** – Core functionality: CRUD operations, localStorage persistence, filtering, drag‑and‑drop, and theme toggling.

---

## Features
- **Add tasks** – Type a task description and press **Enter** or click the add button.
- **Edit tasks** – Double‑click a task description to edit inline.
- **Delete tasks** – Click the trash icon to remove a task.
- **Mark as complete** – Click the checkbox to toggle a task’s completed state.
- **Filter view** – Show **All**, **Active**, or **Completed** tasks.
- **Drag‑and‑drop reordering** – Rearrange tasks by dragging the handle icon.
- **Theme selection** – Light and dark themes; the current theme is saved in `localStorage`.
- **Persistent storage** – All tasks and the selected theme persist across page reloads via `localStorage`.

---

## Setup Instructions
1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/todo-list-webapp.git
   cd todo-list-webapp
   ```
2. **Open the app**
   - Simply open `index.html` in any modern browser (Chrome, Firefox, Edge, Safari).
   - No additional dependencies, build steps, or server are required.

---

## Usage Guide
### Adding a Task
1. Click the input field at the top of the list or press **Ctrl+Space** to focus it.
2. Type the task description.
3. Press **Enter** or click the **+** button.
   - The new task appears at the bottom of the current list.

### Editing a Task
1. Double‑click the task text you wish to edit.
2. Modify the text directly in the inline editor.
3. Press **Enter** or click outside the input to save.
   - Press **Esc** to cancel the edit.

### Deleting a Task
- Click the trash‑can icon on the right side of the task row.

### Completing a Task
- Click the checkbox (or press **Space** when the task row is focused) to toggle the completed state.
- Completed tasks are shown with a strikethrough style.

### Filtering Tasks
- Use the filter buttons at the bottom (**All**, **Active**, **Completed**) to change the visible set.
- The selected filter is saved, so the view persists after a page reload.

### Drag‑and‑Drop Reordering
1. Hover over a task row; a drag handle (≡) appears on the left.
2. Click and hold the handle, then move the task to the desired position.
3. Release the mouse button to drop the task.
   - The new order is saved automatically.

### Theme Selection
- Click the sun/moon icon in the header to toggle between **Light** and **Dark** themes.
- The chosen theme is stored in `localStorage` and applied on subsequent visits.

---

## File Structure & Customisation
```
├── index.html          # Main HTML page
├── style.css           # Global styles & CSS variables (colours, fonts)
├── script.js           # Application logic (CRUD, storage, drag‑drop)
└── README.md           # Documentation (this file)
```
### Where to customise colours
All colour values are defined as CSS variables at the top of **style.css**:
```css
:root {
    --color-bg-light: #f9fafb;
    --color-bg-dark:  #1e1e1e;
    --color-primary: #4f46e5;   /* accent colour */
    --color-text-light: #111827;
    --color-text-dark:  #e5e7eb;
    /* add or modify variables here */
}
```
- Edit these variables to change the colour palette.
- The dark theme overrides the same variables inside a `[data-theme="dark"]` block.

---

## Contributing
Contributions are welcome! If you’d like to improve the app, follow these steps:
1. **Fork** the repository.
2. **Create a new branch** for your feature or bug‑fix.
   ```bash
   git checkout -b feature/awesome-feature
   ```
3. Make your changes, ensuring the app still works by opening `index.html`.
4. **Commit** with a clear message and **push** to your fork.
5. Open a **Pull Request** describing the changes.

Please keep the codebase consistent with the existing style (plain JavaScript, no external libraries) and update this README if you add new features.

---

## License
[Insert License Here] – e.g., MIT, Apache 2.0, or a custom license.

---

*Happy coding!*