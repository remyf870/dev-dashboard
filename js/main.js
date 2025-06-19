// js/main.js

// Import Functions
import { setupAuthListeners } from "./auth.js";
import { setupUIEventListeners } from "./ui.js";

// Activate Functions
setupAuthListeners();
setupUIEventListeners();

console.log("App has been started from main.js");
