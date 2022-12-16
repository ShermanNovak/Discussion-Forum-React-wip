import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;