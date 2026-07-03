import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGJrNKCdV-ZdBI0pIWpY3TJ_GtQt-dUqw",
  authDomain: "tripvault-d9f80.firebaseapp.com",
  projectId: "tripvault-d9f80",
  storageBucket: "tripvault-d9f80.firebasestorage.app",
  messagingSenderId: "643673100918",
  appId: "1:643673100918:web:ea7b568586edbe4e104557"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGJrNKCdV-ZdBI0pIWpY3TJ_GtQt-dUqw",
  authDomain: "tripvault-d9f80.firebaseapp.com",
  projectId: "tripvault-d9f80",
  storageBucket: "tripvault-d9f80.firebasestorage.app",
  messagingSenderId: "643673100918",
  appId: "1:643673100918:web:ea7b568586edbe4e104557"
};

const app = initializeApp(firebaseConfig);

export default app;

