// Import the initialized auth object from firebase-config.js
import { auth } from "./firebase-config.js"; // This imports the auth object that you initialized in firebase-config.js
import { onAuthStateChanged } from "firebase/auth";
// Import Firebase SDKs for required functionalities
import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// Select DOM elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const resetBtn = document.getElementById("resetBtn");
const messageBox = document.getElementById("message");

// 🚀 Login Function
loginBtn.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user; // Get the logged-in user
      messageBox.innerText = `Login Successful! Welcome, ${user.email}`;
      showLogoutButton(); // Make sure to show the logout button
    })
    .catch((error) => {
      messageBox.innerText = "Login Failed: " + error.message;
    });
});

// 🔐 Logout Function
logoutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      messageBox.innerText = "Logged Out!";
      hideLogoutButton();
    })
    .catch((error) => {
      messageBox.innerText = "Error during logout: " + error.message;
    });
});

// 🔑 Password Reset
resetBtn.addEventListener("click", () => {
  const email = emailInput.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      messageBox.innerText = "Password reset email sent!";
    })
    .catch((error) => {
      messageBox.innerText = "Error: " + error.message;
    });
});

// 🔹 Check Authentication State
onAuthStateChanged(auth, (user) => {
  if (user) {
    messageBox.innerText = "You are logged in as " + user.email;
    showLogoutButton();
  } else {
    hideLogoutButton();
    messageBox.innerText = "Please log in.";
  }
});

// 🔥 Utility Functions
function showLogoutButton() {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
}

function hideLogoutButton() {
  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";
}
