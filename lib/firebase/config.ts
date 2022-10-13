import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDOaOr1ou3cxp7q3mgMOqoJUYbw5CgA1rg",
  authDomain: "netcomic-843e6.firebaseapp.com",
  projectId: "netcomic-843e6",
  storageBucket: "netcomic-843e6.appspot.com",
  messagingSenderId: "1041710770994",
  appId: "1:1041710770994:web:995e002bfa6be7fe25c52b",
  measurementId: "G-KQQ4R1MEEX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
