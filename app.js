import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// 🔹 Firebase Configuration (Replace with Your Own)
const firebaseConfig = {
  apiKey: "AIzaSyC6bxcU0nGOCt7duD9yFulWsxbUcjY-OQY",
  authDomain: "homeauto-b4281.firebaseapp.com",
  projectId: "homeauto-b4281",
  storageBucket: "homeauto-b4281.firebasestorage.app",
  messagingSenderId: "740975531203",
  appId: "1:740975531203:web:03fe474d73fa250a427e76",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// 🔹 Select UI Elements
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
    .then(() => {
      messageBox.innerText = "Login Successful!";
      showLogoutButton();
    })
    .catch((error) => {
      messageBox.innerText = "Login Failed: " + error.message;
    });
});

// 🔐 Logout Function
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    messageBox.innerText = "Logged Out!";
    hideLogoutButton();
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
    // Only allow access if Firestore rules allow it (based on the email in the rules)
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
