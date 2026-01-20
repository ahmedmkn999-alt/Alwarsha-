import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzm6ZN5jahgC3ImGIhhvZAgaANewwbWbA",
  authDomain: "alwarsha-cdb53.firebaseapp.com",
  projectId: "alwarsha-cdb53",
  storageBucket: "alwarsha-cdb53.firebasestorage.app",
  messagingSenderId: "104239526905",
  appId: "1:104239526905:web:a81264b362fdf97b988328",
  measurementId: "G-VYDZF48LWQ"
};

// التأكد من عدم تشغيل التطبيق مرتين
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
