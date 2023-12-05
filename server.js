const Hapi = require("@hapi/hapi");
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");
// const { initializeApp } = require("firebase/app");

const routes = require("./routes");

// const { createUserWithEmailAndPassword } = require("firebase-admin/auth");

const init = async () => {
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount),
  //   });

  const server = Hapi.server({
    port: 8080,
    host: "localhost",
  });

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCFRdB5beYsB2b4L7_I1E1PymXWUSNYG2k",
  //   authDomain: "batikdiscover-d03ae.firebaseapp.com",
  //   projectId: "batikdiscover-d03ae",
  //   storageBucket: "batikdiscover-d03ae.appspot.com",
  //   messagingSenderId: "600186221293",
  //   appId: "1:600186221293:web:57e1802f38ca322fb792e4",
  // };

  // // Firebase initialization
  // const app = initializeApp(firebaseConfig);
  // const db = admin.firestore();
  // const auth = admin.auth();

  // Register user endpoint
  // server.route({
  //   method: "POST",
  //   path: "/register",
  //   handler: async (request, h) => {
  //     const { firstName, lastName, email, password } = request.payload;

  //     try {
  //       // Create user using Firebase Admin SDK
  //       const userRecord = await admin.auth().createUser({
  //         email: email,
  //         password: password,
  //       });
  //       // Create user in Firebase Authentication
  //       // const userRecord = await auth.createUserWithEmailAndPassword(
  //       //   email,
  //       //   password
  //       // );

  //       // Create user document in Firestore
  //       await db.collection("users").doc(userRecord.uid).set({
  //         email,
  //         firstName,
  //         lastName,
  //       });

  //       return h
  //         .response({ message: "User registered successfully!" })
  //         .code(201);
  //     } catch (error) {
  //       console.error(error);
  //       return h.response({ message: error.message }).code(500);
  //     }
  //   },
  // });
  server.route(routes);

  try {
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

init();
