// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '*****************************************',
  authDomain: 'lincedin-clone-4e84a.firebaseapp.com',
  projectId: 'lincedin-clone-4e84a',
  storageBucket: 'lincedin-clone-4e84a.appspot.com',
  messagingSenderId: '455044465339',
  appId: '1:455044465339:web:1eca1cd4dbd6e6d83e1f9e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, app, firestore, storage };
