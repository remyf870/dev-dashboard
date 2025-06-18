// js/auth.js

// Import Functions
import { auth } from "./firebase.js";
import {
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { showAppView, showLogInView } from "./ui.js";

import { setupFirestoreListeners } from "./firestore.js";

export async function signInWithGitHub() {
  const provider = new GithubAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Sign-in attempt failed:", error);
  }
}

export async function logout() {
  try {
    await signOut(auth);
    // If successful, onAuthStateChange will update console log
  } catch (error) {
    console.error("Sign-out attempt failed:", error);
  }
}

export function setupAuthListeners() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, log to console
      //showAppView();
      console.log(
        "Auth state changed - User is now logged in.",
        user.displayName,
        user.uid
      );
      setupFirestoreListeners();
    } else {
      // User is not signed in, log to console
      //showLogInView();
      console.log("Auth state changed - No user is logged in.");
    }
  });
}
