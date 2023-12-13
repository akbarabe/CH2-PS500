const {
  db,
  admin,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} = require("../../config/firebase");
const verifyToken = require("../token");

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
      const token = user.stsTokenManager;

      return h
        .response({
          message: "success",
          data: {
            user,
          },
        })
        .code(200);
    } catch (error) {
      console.error(error);
      return h.response({ message: error.message }).code(400);
    }
  }
  async logoutHandler(request, h) {
    const token = request.headers.authorization;
    const userId = await verifyToken(token);
    try {
      await admin.auth().revokeRefreshTokens(userId);
      let checkRevoked = false;
      await admin.auth().verifyIdToken(token, checkRevoked);
      console.log(
        `Refresh tokens revoked for user: ${userId} || ${checkRevoked}`
      );
      return h
        .response({
          message: "success",
        })
        .code(200);
    } catch (error) {
      return h.response({ message: error.message }).code(400);
    }
  }
}

module.exports = AuthHandler;
