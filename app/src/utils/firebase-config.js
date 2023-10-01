import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCe6TMxYNSitQuuC9eFnjVnEv19PQJvuDk",
  authDomain: "flixxit-34f47.firebaseapp.com",
  projectId: "flixxit-34f47",
  storageBucket: "flixxit-34f47.appspot.com",
  messagingSenderId: "507019797048",
  appId: "1:507019797048:web:ecc6143dc12ff3bb6d7ccd",
  measurementId: "G-W3W5QLW7ZC"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);