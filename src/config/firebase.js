import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjsfsj4GOcmwxu0OHZTJfxzDCROIiMPLo",
  authDomain: "fir-project-65e1f.firebaseapp.com",
  projectId: "fir-project-65e1f",
  storageBucket: "fir-project-65e1f.appspot.com",
  messagingSenderId: "6850095114",
  appId: "1:6850095114:web:84d28de919172fcd6217f3",
  measurementId: "G-8DC5RYDBPD"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
