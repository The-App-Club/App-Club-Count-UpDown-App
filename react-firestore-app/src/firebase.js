// https://firebase.google.com/docs/web/learn-more#multiple-projects
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {
  getFirestore,
  collection,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
  getDoc,
  runTransaction,
  onSnapshot,
} from 'firebase/firestore';

const project = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});
const auth = getAuth(project);
const firestore = getFirestore(project);

const database = {
  count: collection(firestore, 'count'),
  formatDoc: (doc) => {
    return {id: doc.id, ...doc.data()};
  },
  getCurrentTimestamp: serverTimestamp,
  addDoc: addDoc,
  setDoc: setDoc,
  getDoc: getDoc,
  runTransaction: runTransaction,
  doc: doc,
  onSnapshot: onSnapshot,
  db: firestore,
};

export {project, auth, database};
