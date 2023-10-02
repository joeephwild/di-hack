// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWp-N8oSQIEDEfr-WkGPxIwYwGZydij4",
  authDomain: "lacent-7a6b4.firebaseapp.com",
  projectId: "lacent-7a6b4",
  storageBucket: "lacent-7a6b4.appspot.com",
  messagingSenderId: "388128287208",
  appId: "1:388128287208:web:22e1bf229fc29edb909c5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
