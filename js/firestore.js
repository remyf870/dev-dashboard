// js/firestore.js
// All functions for interacting with the Firestore database will go here.

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { db } from "./firebase.js";

import { renderTasks } from "./ui.js";

// Function that creates the task and stores data in Firestore
export async function addTask(title, description) {
  const docRef = await addDoc(collection(db, "tasks"), {
    title: title,
    description: description,
    status: "todo",
    createdAt: new Date(),
  });
}

// Firestore Listener / Get Task Data
export function setupFirestoreListeners() {
  const snap = onSnapshot(collection(db, "tasks"), (snapshot) => {
    console.log(snapshot);
    const tasksList = [];
    for (const doc of snapshot.docs) {
      const taskData = doc.data();
      const taskId = doc.id;
      const cleanTaskObject = {
        id: taskId,
        title: taskData.title,
        description: taskData.description,
        createdAt: taskData.createdAt,
        status: taskData.status,
      };
      tasksList.push(cleanTaskObject);
    }
    renderTasks(tasksList);
  });
}

// Function to delete a task by ID
export async function deleteTask(taskId, taskTitle) {
  try {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
    console.log(`Task "${taskTitle}" (ID: ${taskId}) deleted successfully.`);
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Update Task Status - Firestore
export async function updateTaskStatus(taskId, newStatus) {
  const taskRef = doc(db, "tasks", taskId);
  updateDoc(taskRef, { status: newStatus });
}
