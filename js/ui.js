// js/ui.js

// Import Functions
import { signInWithGitHub, logout } from "./auth.js";
import { addTask, deleteTask } from "./firestore.js";

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

  // Event Listener for form submit button - saves task
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

// Create Task Cards and Render on Project Board

let deleteTaskId = null;
let deleteTaskTitle = null;

export function renderTasks(tasks) {
  const todoContainer = document.getElementById("todo-card-container");
  const ongoingContainer = document.getElementById("ongoing-card-container");
  const completedContainer = document.getElementById(
    "completed-card-container"
  );

  // Clear containers
  todoContainer.innerHTML = "";
  ongoingContainer.innerHTML = "";
  completedContainer.innerHTML = "";

  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add("task-card");

    const title = document.createElement("h3");
    title.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.textContent = "❌"; // decided to go with an emoji here
    deleteBtn.addEventListener("click", () => {
      // Set task data to be deleted
      deleteTaskId = task.id;
      deleteTaskTitle = task.title;
      // Show modal
      showDeleteModal(task.title);
    });

    card.appendChild(title);
    card.appendChild(deleteBtn);

    const container = getContainerByStatus(task.status);
    container.appendChild(card);
  });
}

function getContainerByStatus(status) {
  switch (status) {
    case "todo":
      return document.getElementById("todo-card-container");
    case "inprogress":
    case "ongoing":
      return document.getElementById("ongoing-card-container");
    case "done":
    case "completed":
      return document.getElementById("completed-card-container");
    default:
      return document.getElementById("todo-card-container");
  }
}

function showDeleteModal(title) {
  const modal = document.getElementById("delete-modal");
  const message = document.getElementById("delete-message");
  message.textContent = `Are you sure you want to delete "${title}"?`;
  modal.style.display = "flex";
}

function hideDeleteModal() {
  const modal = document.getElementById("delete-modal");
  modal.style.display = "none";
}

document.getElementById("confirm-delete-btn").addEventListener("click", () => {
  if (deleteTaskId) {
    deleteTask(deleteTaskId, deleteTaskTitle);
    deleteTaskId = null;
    deleteTaskTitle = null;
    hideDeleteModal();
  }
});

document.getElementById("cancel-delete-btn").addEventListener("click", () => {
  deleteTaskId = null;
  deleteTaskTitle = null;
  hideDeleteModal();
});
