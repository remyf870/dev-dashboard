// js/main.js

// Import Functions
import { setupAuthListeners } from "./auth.js";
import { setupUIEventListeners } from "./ui.js";
import { setupFirestoreListeners } from "./firestore.js";

// Activate Functions
setupAuthListeners();
setupUIEventListeners();
setupFirestoreListeners();

console.log("App has been started from main.js");
