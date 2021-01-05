import { firebase } from "@firebase/app";
import "@firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDVBgjnV0fNSOdtSnJnbGC2ptyESQurjro",
  authDomain: "vue-hq-eb948.firebaseapp.com",
  databaseURL: "https://vue-hq-eb948-default-rtdb.firebaseio.com",
  projectId: "vue-hq-eb948",
  storageBucket: "vue-hq-eb948.appspot.com",
  messagingSenderId: "665604920263"
});

export const db = firebaseApp.firestore();
