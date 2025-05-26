// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0MynnGWrCp3YKQP7I7mNnXGVNokUrYIY",
  authDomain: "procuro-final.firebaseapp.com",
  projectId: "procuro-final",
  storageBucket: "procuro-final.firebasestorage.app",
  messagingSenderId: "676893463597",
  appId: "1:676893463597:web:eb202b615c0a5d94d254a4",
  measurementId: "G-QDV7CCMCJ5"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, db, storage, provider };
