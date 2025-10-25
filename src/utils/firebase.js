// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAt8S8S3WnCJ6cnb9SM0_Gwqh7E68U5QIs",
  authDomain: "netflix-gpt-117b2.firebaseapp.com",
  projectId: "netflix-gpt-117b2",
  storageBucket: "netflix-gpt-117b2.firebasestorage.app",
  messagingSenderId: "895174246184",
  appId: "1:895174246184:web:72efc45585b2491b9f5a1d",
  measurementId: "G-C189B9W87G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
