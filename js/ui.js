// js/ui.js

// Import Functions
import { signInWithGitHub, logout } from "./auth.js";
import { addTask, deleteTask, updateTaskStatus } from "./firestore.js";

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
//Switch From Trello To White Board
const boardTitle = document.querySelector(".board-type");
const navLinks = document.querySelectorAll(".nav-link");
const trelloCont = document.getElementById("trello");
const whiteboardCont = document.getElementById("whiteboard-container");
const taskNoteText = document.querySelector(".text-change");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default link behavior

    // Remove 'active' class from all links
    navLinks.forEach((l) => l.classList.remove("active"));

    // Add 'active' class to the clicked link
    e.target.classList.add("active");

    // Update the board title text
    boardTitle.innerText = e.target.innerText;

    // Switch between whiteboard and trello
    if (e.target.innerText === "Trello") {
      whiteboardCont.classList.add("hide");
      whiteboardCont.classList.remove("show");
      trelloCont.classList.add("show");
      taskNoteText.innerText = "Task";
    }
    if (e.target.innerText === "Whiteboard") {
      trelloCont.classList.add("hide");
      trelloCont.classList.remove("show");
      whiteboardCont.classList.add("show");
      taskNoteText.innerText = "Note";
    }
  });
});
//Show Task Modal
const taskModal = document.getElementById("taskModal");
const addTaskBtn = document.getElementById("add-task-nav");
const mobileTaskBtn = document.getElementById("add-task-mobile");

function showTaskModal() {
  taskModal.classList.add("show");
  taskModal.classList.remove("hide");
}

function hideTaskModal() {
  taskModal.classList.add("hide");
  taskModal.classList.remove("show");
}
addTaskBtn.addEventListener("click", showTaskModal);
mobileTaskBtn.addEventListener("click", showTaskModal);

taskModal.addEventListener("click", (e) => {
  if (e.target === taskModal) {
    hideTaskModal();
  }
});

// Dark Mode Toggle

const darkModeSwitch = document.getElementById("dark-mode");

// on toggle, add/remove the class
darkModeSwitch.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

// optional: remember preference
const saved = localStorage.getItem("darkMode") === "true";
darkModeSwitch.checked = saved;
document.body.classList.toggle("dark-mode", saved);
darkModeSwitch.addEventListener("change", (e) => {
  localStorage.setItem("darkMode", e.target.checked);
  document.body.classList.toggle("dark-mode", e.target.checked);
});

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
    card.dataset.id = task.id;

    const title = document.createElement("p");
    title.textContent = task.title;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-button");
    deleteBtn.innerHTML = `<!-- From Uiverse.io by vinodjangid07 --> 
<button class="deleteButton">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 50 59"
    class="bin"
  >
    <path
      fill="#B5BAC1"
      d="M0 7.5C0 5.01472 2.01472 3 4.5 3H45.5C47.9853 3 50 5.01472 50 7.5V7.5C50 8.32843 49.3284 9 48.5 9H1.5C0.671571 9 0 8.32843 0 7.5V7.5Z"
    ></path>
    <path
      fill="#B5BAC1"
      d="M17 3C17 1.34315 18.3431 0 20 0H29.3125C30.9694 0 32.3125 1.34315 32.3125 3V3H17V3Z"
    ></path>
    <path
      fill="#B5BAC1"
      d="M2.18565 18.0974C2.08466 15.821 3.903 13.9202 6.18172 13.9202H43.8189C46.0976 13.9202 47.916 15.821 47.815 18.0975L46.1699 55.1775C46.0751 57.3155 44.314 59.0002 42.1739 59.0002H7.8268C5.68661 59.0002 3.92559 57.3155 3.83073 55.1775L2.18565 18.0974ZM18.0003 49.5402C16.6196 49.5402 15.5003 48.4209 15.5003 47.0402V24.9602C15.5003 23.5795 16.6196 22.4602 18.0003 22.4602C19.381 22.4602 20.5003 23.5795 20.5003 24.9602V47.0402C20.5003 48.4209 19.381 49.5402 18.0003 49.5402ZM29.5003 47.0402C29.5003 48.4209 30.6196 49.5402 32.0003 49.5402C33.381 49.5402 34.5003 48.4209 34.5003 47.0402V24.9602C34.5003 23.5795 33.381 22.4602 32.0003 22.4602C30.6196 22.4602 29.5003 23.5795 29.5003 24.9602V47.0402Z"
      clip-rule="evenodd"
      fill-rule="evenodd"
    ></path>
    <path fill="#B5BAC1" d="M2 13H48L47.6742 21.28H2.32031L2 13Z"></path>
  </svg>

  <span class="tooltip">Delete</span>
</button>
`;
    deleteBtn.addEventListener("click", (event) => {
      // Set task data to be deleted
      deleteTaskId = task.id;
      deleteTaskTitle = task.title;
      // Show modal
      showDeleteModal(task.title);
      event.stopPropagation();
    });

    card.appendChild(title);
    card.appendChild(deleteBtn);

    // Show task details when clicking the card (excluding the delete button)
    card.addEventListener("click", (event) => {
      // Prevent click event if delete button is clicked
      if (event.target.classList.contains("delete-button")) return;

      showTaskDetailsModal(task);
    });

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
  message.innerText = `Delete "${title}"?`;
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

document
  .getElementById("close-task-details-btn")
  .addEventListener("click", hideTaskDetailsModal);

// show tasks details on click
function showTaskDetailsModal(task) {
  const modal = document.getElementById("task-details-modal");

  document.getElementById("task-title").textContent =
    task.title || "Untitled Task";
  document.getElementById("task-desc").textContent = `Description: ${
    task.description || "None"
  }`;
  document.getElementById("task-created").textContent = `Created: ${formatDate(
    task.createdAt
  )}`;
  document.getElementById("task-status").textContent = `Status: ${task.status}`;

  modal.style.display = "flex";
}

function hideTaskDetailsModal() {
  document.getElementById("task-details-modal").style.display = "none";
}

function formatDate(timestamp) {
  try {
    const date = timestamp.toDate();
    return date.toLocaleString();
  } catch (e) {
    return "Unknown date";
  }
}

// Drag and Drop Functionality

const todoColumn = document.getElementById("todo-card-container");
const ongoingColumn = document.getElementById("ongoing-card-container");
const completedColumn = document.getElementById("completed-card-container");

// To-Do Column Drag/Drop
new Sortable(todoColumn, {
  group: "shared",
  onEnd: function (event) {
    const taskId = event.item.dataset.id;
    let newStatus = "";
    if (event.to.id === "todo-card-container") {
      newStatus = "todo";
    } else if (event.to.id === "ongoing-card-container") {
      newStatus = "ongoing";
    } else if (event.to.id === "completed-card-container") {
      newStatus = "completed";
    }
    if (newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  },
});

// Ongoing Drag/Drop
new Sortable(ongoingColumn, {
  group: "shared",
  onEnd: function (event) {
    const taskId = event.item.dataset.id;
    let newStatus = "";
    if (event.to.id === "todo-card-container") {
      newStatus = "todo";
    } else if (event.to.id === "ongoing-card-container") {
      newStatus = "ongoing";
    } else if (event.to.id === "completed-card-container") {
      newStatus = "completed";
    }
    if (newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  },
});

// Completed Drag/Drop
new Sortable(completedColumn, {
  group: "shared",
  onEnd: function (event) {
    const taskId = event.item.dataset.id;
    let newStatus = "";
    if (event.to.id === "todo-card-container") {
      newStatus = "todo";
    } else if (event.to.id === "ongoing-card-container") {
      newStatus = "ongoing";
    } else if (event.to.id === "completed-card-container") {
      newStatus = "completed";
    }
    if (newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  },
});
