// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQ-Z7YjQMKx0ZqZ0PzcE5Hk7_O0FK1xEw",
  authDomain: "bacgram-54cd3.firebaseapp.com",
  projectId: "bacgram-54cd3",
  storageBucket: "bacgram-54cd3.appspot.com",
  messagingSenderId: "1044944350081",
  appId: "1:1044944350081:web:1e67f7b02e5523041ed680",
  measurementId: "G-8C2Q8VDK4N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
