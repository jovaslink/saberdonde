import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8xm3sW0oSwyJdmLgFXYqOf73JKxNsvJc",
  authDomain: "saberdonde-4f8d8.firebaseapp.com",
  databaseURL: "https://saberdonde-4f8d8.firebaseio.com",
  projectId: "saberdonde-4f8d8",
  storageBucket: "saberdonde-4f8d8.appspot.com",
  messagingSenderId: "440716607417",
  appId: "1:440716607417:web:e650f1ab8bc07780204068",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db, firebase };
