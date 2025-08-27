import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD5yqSGJCDX_fl9cF3tmWrkCBbZLjEpyJc",
  authDomain: "practice-project-77fff.firebaseapp.com",
  projectId: "practice-project-77fff",
  storageBucket: "practice-project-77fff.firebasestorage.app",
  messagingSenderId: "207363485397",
  appId: "1:207363485397:web:1707074dac247f8c0fbc5c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app);

