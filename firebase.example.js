import firebase from 'firebase/app';
import 'firebase/firestore';

// Ejemplo de configuración de Firebase
// Copia este archivo como firebase.js y reemplaza con tus credenciales reales
var firebaseConfig = {
  apiKey: "tu-api-key-aqui",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto-id",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase };
