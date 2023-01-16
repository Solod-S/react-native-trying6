// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import "firebase/storage";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAmkio6TDw16OBMXtlY1_dVWB0DosVyiM",
  authDomain: "photogram-d7a6c.firebaseapp.com",
  projectId: "photogram-d7a6c",
  storageBucket: "photogram-d7a6c.appspot.com",
  messagingSenderId: "733065486038",
  appId: "1:733065486038:web:30cabbe565022e6d12b377",
  measurementId: "G-6JEYDENF19",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// makes error const auth = getAuth(app);

export const fsbase = getFirestore(app);
