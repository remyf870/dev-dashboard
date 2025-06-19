// js/ui.js

// Import Functions
import { signInWithGitHub, logout } from "./auth.js";
import { addTask, updateTaskStatus } from "./firestore.js";

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

// Create Task Cards and Render on Project Board
export function renderTasks(tasks) {
  console.log("Render Tasks", tasks);
  document.getElementById("todo-card-container").innerHTML = "";
  document.getElementById("ongoing-card-container").innerHTML = "";
  document.getElementById("completed-card-container").innerHTML = "";
  tasks.forEach((task) => {
    const cardElement = document.createElement("div");
    cardElement.className = "task-card";
    cardElement.dataset.id = task.id;

    const titleElement = document.createElement("h3");
    titleElement.textContent = task.title;

    const deleteElement = document.createElement("button");
    deleteElement.className = "delete-button";
    deleteElement.textContent = "X";

    cardElement.appendChild(titleElement);
    cardElement.appendChild(deleteElement);

    if (task.status == "todo") {
      document.getElementById("todo-card-container").appendChild(cardElement);
    } else if (task.status == "ongoing") {
      document
        .getElementById("ongoing-card-container")
        .appendChild(cardElement);
    } else if (task.status == "completed") {
      document
        .getElementById("completed-card-container")
        .appendChild(cardElement);
    }
  });
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
