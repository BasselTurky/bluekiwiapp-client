// firebaseConfig.js
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCDgLxA3bMHCeVZfNNKItWZL7fwosuFxxs",
  authDomain: "pc-api-5679197225760885144-473.firebaseapp.com",
  projectId: "pc-api-5679197225760885144-473",
  storageBucket: "pc-api-5679197225760885144-473.appspot.com",
  //   messagingSenderId: "<SENDER_ID>",
  appId: "1:525928726797:android:02b89a5fdd6af294757044",
  //   measurementId: "<MEASUREMENT_ID>",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
