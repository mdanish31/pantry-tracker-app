// pantry-tracker-app/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB0ey3n1BAhGTf1n-kQF6wFYmdRkD0yiGw",
  authDomain: "pantry-app-fa462.firebaseapp.com",
  projectId: "pantry-app-fa462",
  storageBucket: "pantry-app-fa462.appspot.com",
  messagingSenderId: "101380728691",
  appId: "1:101380728691:web:192d72ac23eca000c88706",
  measurementId: "G-YCMKZKYS3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase App Initialized:', app);
const db = getFirestore(app);
console.log('Firestore Initialized:', db);

export { db };
