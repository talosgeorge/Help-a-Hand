// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCAWPXNlC25uAZ8pL4Cm4O_9dGTGPcXgGY",
    authDomain: "help-a-hand.firebaseapp.com",
    projectId: "help-a-hand",
    storageBucket: "help-a-hand.appspot.com",
    messagingSenderId: "804637525714",
    appId: "1:804637525714:web:279c08e1e280cd93ebcf0b",
    measurementId: "G-Q8LFVSHVFX"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);      // 🔐 Autentificare
export const db = getFirestore(app);   // 📦 Bază de date Firestore
