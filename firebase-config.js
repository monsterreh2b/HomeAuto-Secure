// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase project configuration (from Firebase Console > Project settings)
const firebaseConfig = {
  apiKey: "AIzaSyC6bxcU0nGOCt7duD9yFulWsxbUcjY-OQY",
  authDomain: "homeauto-b4281.firebaseapp.com",
  projectId: "homeauto-b4281",
  storageBucket: "homeauto-b4281.firebasestorage.app",
  messagingSenderId: "740975531203",
  appId: "1:740975531203:web:03fe474d73fa250a427e76",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; // Export auth and db to be used in other files
