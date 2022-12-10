// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANxe_NDdpUDgb427b_KWxfBpKH6w6ZGg8",
  authDomain: "discussion-forum-8924d.firebaseapp.com",
  projectId: "discussion-forum-8924d",
  storageBucket: "discussion-forum-8924d.appspot.com",
  messagingSenderId: "92475441970",
  appId: "1:92475441970:web:f9200d1e52d1010e050d2b",
  measurementId: "G-WTGRCMVBJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);