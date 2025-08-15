import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlaAg6YN7qRYly6jDHhuejkc7meRvrglc",
  authDomain: "simplist-e0633.firebaseapp.com",
  databaseURL: "https://simplist-e0633.firebaseio.com",
  projectId: "simplist-e0633",
  storageBucket: "simplist-e0633.firebasestorage.app",
  messagingSenderId: "475340693853",
  appId: "1:475340693853:web:a44e5d2303de6540ee48b4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
