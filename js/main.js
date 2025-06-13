// js/main.js

// Import Functions from Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { firebaseConfig } from "./firebase-config.js"; // Your config file
import { setupAuthListeners } from "./auth.js";
import { setupUIEventListeners } from "./ui.js";

// TODO: Import other Firebase functions as you need them (e.g., for Auth, Firestore)

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Start App

setupAuthListeners();
setupUIEventListeners();

console.log("Firebase has been initialized!");
