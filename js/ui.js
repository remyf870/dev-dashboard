// js/ui.js

// Import Functions
import { signInWithGitHub, logout } from "./auth.js";
import { addTask } from "./firestore.js";

// Setup Button Event Listeners (Placeholder - backend-test.html)

export function setupUIEventListeners() {
  const testLoginBtn = document.getElementById("login-button");
  if (testLoginBtn) {
    testLoginBtn.addEventListener("click", signInWithGitHub);
  }

  const testLogoutBtn = document.getElementById("logout-button");
  if (testLogoutBtn) {
    testLogoutBtn.addEventListener("click", logout);
  }

  // Event Listner for form submit button - saves task
  const saveTask = document.getElementById("submit-data");
  if (saveTask) {
    saveTask.addEventListener("submit", (event) => {
      event.preventDefault();
      const titleInput = document.getElementById("title-input").value;
      const descInput = document.getElementById("desc-input").value;
      addTask(titleInput, descInput);
      saveTask.reset();
    });
  }
}

export function showAppView() {
  const login = (document.getElementById("login-section").style.display =
    "none");
  const appSect = (document.getElementById("app-section").style.display =
    "block");
}

export function showLogInView() {
  const login = (document.getElementById("login-section").style.display =
    "block");
  const appSect = (document.getElementById("app-section").style.display =
    "none");
}
