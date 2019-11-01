import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBrskwUj3DLSW-8iypYCEjGQR-zVuvRAjw",
    authDomain: "crwn-db-2c274.firebaseapp.com",
    databaseURL: "https://crwn-db-2c274.firebaseio.com",
    projectId: "crwn-db-2c274",
    storageBucket: "crwn-db-2c274.appspot.com",
    messagingSenderId: "14725987799",
    appId: "1:14725987799:web:0fa4e4f6ad75867a269f92",
    measurementId: "G-TQ4HQR96R2"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;

