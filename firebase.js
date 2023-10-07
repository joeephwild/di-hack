import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, EmailAuthProvider } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACWp-N8oSQIEDEfr-WkGPxIwYwGZydij4",

  authDomain: "lacent-7a6b4.firebaseapp.com",

  databaseURL: "https://lacent-7a6b4-default-rtdb.firebaseio.com",

  projectId: "lacent-7a6b4",

  storageBucket: "lacent-7a6b4.appspot.com",

  messagingSenderId: "388128287208",

  appId: "1:388128287208:web:22e1bf229fc29edb909c5d"

};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new EmailAuthProvider();

export { provider, auth, app, db };