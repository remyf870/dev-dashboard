// js/main.js

// Import Functions
// import { setupAuthListeners } from "./auth.js";
// import { setupUIEventListeners } from "./ui.js";
// import { setupFirestoreListeners } from "./firestore.js";

// // Activate Functions
// setupAuthListeners();
// setupUIEventListeners();
// setupFirestoreListeners();

// console.log("App has been started from main.js");

// js/main.js

// Import Functions
import { setupUIEventListeners } from "./ui.js";
import { setupFirestoreListeners } from "./firestore.js";

console.log("App has been started from main.js");

// Directly set up Firestore listeners without waiting for auth
setupFirestoreListeners();

// Directly set up UI event listeners (for form, etc.)
setupUIEventListeners();
import { renderTasks } from "./ui.js";

renderTasks([
  {
    id: "1",
    title: "Sample To-Do",
    status: "todo",
    description: "Just a test card",
    createdAt: { toDate: () => new Date() },
  },
  {
    id: "2",
    title: "In Progress Example",
    status: "ongoing",
    description: "Working on styling",
    createdAt: { toDate: () => new Date() },
  },
  {
    id: "3",
    title: "Finished Task",
    status: "completed",
    description: "Looks great!",
    createdAt: { toDate: () => new Date() },
  },
]);
