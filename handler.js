const info = require("./info.json");
const data = info;
const {
  db,
  admin,
  getAuth,
  signInWithEmailAndPassword,
} = require("./config/firebase");

const registerHandler = async (request, h) => {
  const { firstName, lastName, email, password } = request.payload;

  try {
    // Create user using Firebase Admin SDK
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
    });
    // Create user in Firebase Authentication
    // const userRecord = await auth.createUserWithEmailAndPassword(
    //   email,
    //   password
    // );

    // Create user document in Firestore
    await db.collection("users").doc(userRecord.uid).set({
      email,
      firstName,
      lastName,
    });

    return h.response({ message: "User registered successfully!" }).code(201);
  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(500);
  }
};

const loginHandler = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const auth = await getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    return h.response({ message: "User Successfully login" }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: error.message }).code(400);
  }
};

const celupHandler = async (request, h) => {
  try {
    const batik = data[0];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const insangHandler = async (request, h) => {
  try {
    const batik = data[1];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const kawungHandler = async (request, h) => {
  try {
    const batik = data[2];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const megaHandler = async (request, h) => {
  try {
    const batik = data[3];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const parangHandler = async (request, h) => {
  try {
    const batik = data[4];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const polengHandler = async (request, h) => {
  try {
    const batik = data[5];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

const truntumHandler = async (request, h) => {
  try {
    const batik = data[6];
    return batik;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return h.response("Internal Server Error").code(500);
  }
};

module.exports = {
  registerHandler,
  celupHandler,
  insangHandler,
  kawungHandler,
  megaHandler,
  parangHandler,
  polengHandler,
  truntumHandler,
  loginHandler,
};
