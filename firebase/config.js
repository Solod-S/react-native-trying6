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
  apiKey: "AIzaSyBePau1bw4N6sgGjWOkei4mKR2CUsmdrZ0",
  authDomain: "photogram-cfce0.firebaseapp.com",
  projectId: "photogram-cfce0",
  storageBucket: "photogram-cfce0.appspot.com",
  messagingSenderId: "314004100068",
  appId: "1:314004100068:web:a8d36e79d56548fd13edf1",
  measurementId: "G-6G14GYQ2TK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// makes error const auth = getAuth(app);

export const fsbase = getFirestore(app);
