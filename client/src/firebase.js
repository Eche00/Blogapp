// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwu2yjE0EJ19e9kVKnYs1mv7hENujPoU0",
  authDomain: "blog-app-ddadb.firebaseapp.com",
  projectId: "blog-app-ddadb",
  storageBucket: "blog-app-ddadb.appspot.com",
  messagingSenderId: "697574428035",
  appId: "1:697574428035:web:f681f0869d44e02f483ab6",
  measurementId: "G-Y8Z7V6DR4P",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
