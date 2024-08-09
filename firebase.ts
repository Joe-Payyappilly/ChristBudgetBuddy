// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAy3bZzuNFnVtLqBIMJsybHzsFAfsJI5HY",
  authDomain: "christbudgetbuddy.firebaseapp.com",
  projectId: "christbudgetbuddy",
  storageBucket: "christbudgetbuddy.appspot.com",
  messagingSenderId: "39489482054",
  appId: "1:39489482054:web:72c02d504b274551c14947"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);