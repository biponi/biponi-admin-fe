import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  // Replace with your actual Firebase project configuration
  apiKey: "AIzaSyDHA0-H90LiprsU9IelwBoDmO6Copfz17w",
  authDomain: "biponi-6420e.firebaseapp.com",
  projectId: "biponi-6420e",
  storageBucket: "biponi-6420e.appspot.com",
  messagingSenderId: "717487893977",
  appId: "1:717487893977:web:8a60163196d59f5d477dc8",
  measurementId: "G-2287VKC7VF",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
