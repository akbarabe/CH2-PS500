const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");
const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyCPm2oCAHtrOuKOFLkJT8Wy7ta8efqpmNM",
  authDomain: "batikdiscover-d5f42.firebaseapp.com",
  projectId: "batikdiscover-d5f42",
  storageBucket: "batikdiscover-d5f42.appspot.com",
  messagingSenderId: "57166798653",
  appId: "1:57166798653:web:68c64c152ec7450beb6f54",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Firebase initialization
const app = initializeApp(firebaseConfig);
const db = admin.firestore();

module.exports = { admin, db, getAuth, signInWithEmailAndPassword };
