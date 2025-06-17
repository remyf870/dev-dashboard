// js/ui.js

// Import Functions
import { signInWithGitHub, logout } from "./auth.js";

// Setup Button Event Listeners (Placeholder - backend-test.html)

export function setupUIEventListeners() {
  const testLoginBtn = document.getElementById("test-login-button");
  if (testLoginBtn) {
    testLoginBtn.addEventListener("click", signInWithGitHub);
  }

  const testLogoutBtn = document.getElementById("test-logout-button");
  if (testLogoutBtn) {
    testLogoutBtn.addEventListener("click", logout);
  }
}
