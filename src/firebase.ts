// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHD14oJ9gfxliRsyXZszCuEvN99vYS_hU",
  authDomain: "mystore-9d3ca.firebaseapp.com",
  projectId: "mystore-9d3ca",
  storageBucket: "mystore-9d3ca.appspot.com",
  messagingSenderId: "273341518552",
  appId: "1:273341518552:web:e403e051cb96864a81bdad",
  measurementId: "G-35DHCZSST1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// apiKey: import.meta.env.VITE_FIREBASE_KEY,
// authDomain: import.meta.env.VITE_AUTH_DOMAIN,
// projectId: import.meta.env.VITE_PRODUCT_ID,
// storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
// messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
// appId: import.meta.env.VITE_APP_ID,
// measurementId: import.meta.env.VITE_MEASUREMENT_ID