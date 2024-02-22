import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getStorage} from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

// Your web app's Firebase configuration
// Note: projectId is still dangersense, this shouldn't affect anything
const firebaseConfig = {
  apiKey: "AIzaSyCFQ4P6vz-HNLs8wAFcfVw6EVNKCJP2oMc",
  authDomain: "danger-sense.firebaseapp.com",
  projectId: "danger-sense",
  storageBucket: "danger-sense.appspot.com",
  messagingSenderId: "340337462373",
  appId: "1:340337462373:web:f65ab79d57e6392cbf0a8c"
};

// Initialize Firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});