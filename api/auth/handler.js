const {
  db,
  admin,
  getAuth,
  signInWithEmailAndPassword,
} = require("../../config/firebase");

const autoBind = require("auto-bind");

class AuthHandler {
  constructor(validator) {
    this._validator = validator;
    autoBind(this);
  }

  async registerHandler(request, h) {
    const { firstName, lastName, email, password } = request.payload;

    this._validator.validateRegisterPayload(request.payload);

    try {
      const userRecord = await admin.auth().createUser({
        email: email,
        password: password,
      });

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
  }

  async loginHandler(request, h) {
    const { email, password } = request.payload;

    this._validator.validateLoginPayload(request.payload);

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
  }
}

module.exports = AuthHandler;
