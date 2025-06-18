// js/firestore.js
// All functions for interacting with the Firestore database will go here.

import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { db } from "./firebase.js";

// Function that creates the task and stores data in Firestore
export async function addTask(title, description) {
  const docRef = await addDoc(collection(db, "tasks"), {
    title: title,
    description: description,
    status: "todo",
    createdAt: new Date(),
  });
}
