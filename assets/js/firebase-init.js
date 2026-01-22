// assets/js/firebase-init.js

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTVtS3JOEnDgqMpDnAImm34VlZSwg2ogQ",
    authDomain: "tpg-website-16c89.firebaseapp.com",
    projectId: "tpg-website-16c89",
    storageBucket: "tpg-website-16c89.firebasestorage.app",
    messagingSenderId: "1096950831381",
    appId: "1:1096950831381:web:64ed1d705e1cda4624711c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services so we can use them in other files
export const auth = getAuth(app);
export const db = getFirestore(app);