import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";
import { getStorage, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxx.firebaseapp.com",
  databaseURL:
    "https://xxxxxxxxxxxxxxxxxxxxxxxxxx.firebasedatabase.app",
  projectId: "xxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxx.appspot.com",
  messagingSenderId: "`1234567890",
  appId: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export {
  db,
  auth,
  createUserWithEmailAndPassword,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  onAuthStateChanged,
  signOut,
  updateDoc,
  storage,
  uploadBytes,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  setDoc,
  getDoc,
  sendPasswordResetEmail,
  sendEmailVerification,
};
