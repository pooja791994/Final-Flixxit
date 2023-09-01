import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD95E8ubK5vTNEBq3aYwoUDaZmWlOiWweo",
  authDomain: "flixxit-6ed95.firebaseapp.com",
  projectId: "flixxit-6ed95",
  storageBucket: "flixxit-6ed95.appspot.com",
  messagingSenderId: "928633986019",
  appId: "1:928633986019:web:db248f97d96b43a52d5ed6",
  measurementId: "G-9RCHSEWHF3"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);