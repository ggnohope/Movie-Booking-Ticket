import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCNPHq3aC5Cs9tDMTe8-po_F-92Fu2XAyg",
    authDomain: "cs426-booking-movietickect-app.firebaseapp.com",
    projectId: "cs426-booking-movietickect-app",
    storageBucket: "cs426-booking-movietickect-app.appspot.com",
    messagingSenderId: "912883202306",
    appId: "1:912883202306:web:04a578de4dd195cbadaa1b",
    measurementId: "G-8SGXF9CCXD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_STO = getStorage(FIREBASE_APP);