// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth}from 'firebase/auth'
import {getFirestore}from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2wzeOAqQcoZZu9F8iD6jo9c-ZKBbdlKA",
  authDomain: "journalapp-a1fa8.firebaseapp.com",
  projectId: "journalapp-a1fa8",
  storageBucket: "journalapp-a1fa8.appspot.com",
  messagingSenderId: "875452649265",
  appId: "1:875452649265:web:c0746d13163d02b619aa10"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
//for auth
export const firebaseAuth=getAuth(FirebaseApp);
//database
export const firebaseDB=getFirestore(FirebaseApp);
