import { initializeApp } from "firebase/app";
import {
  getAuth,
  connectAuthEmulator,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBqOgizUSx7Sx4RudGJH841N0ODjepjMl4",
  authDomain: "siosapp-335118.firebaseapp.com",
  databaseURL: "http://localhost:9000/?ns=siosapp-335118-default-rtdb",
  projectId: "siosapp-335118",
  storageBucket: "siosapp-335118.appspot.com",
  messagingSenderId: "519653301005",
  appId: "1:519653301005:web:0022c8a20cf01feab7ae44",
  measurementId: "G-0FQ0WFXJGT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
// connectDatabaseEmulator(db, "192.168.100.187", 9000);
connectDatabaseEmulator(db, "localhost", 9000);

export const auth = getAuth();
// connectAuthEmulator(auth, "http://192.168.100.187:9099");
connectAuthEmulator(auth, "http://localhost:9099");

const functions = getFunctions();
// connectFunctionsEmulator(functions, "192.168.100.187", 5001);
connectFunctionsEmulator(functions, "localhost", 5001);

const storage = getStorage();
// connectStorageEmulator(storage, "192.168.100.187", 9199)
connectStorageEmulator(storage, "localhost", 9199)

