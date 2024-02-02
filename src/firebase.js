// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdAU-FNndOSekAuOHi2uA9qAiR2fqbeiQ",
  authDomain: "todo-app-96a13.firebaseapp.com",
  projectId: "todo-app-96a13",
  storageBucket: "todo-app-96a13.appspot.com",
  messagingSenderId: "96564849443",
  appId: "1:96564849443:web:d56907052bbd55d59f3a96",
  measurementId: "G-CLQSCETLL1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
