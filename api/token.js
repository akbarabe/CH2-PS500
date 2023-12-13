const { admin, getAuth } = require("../config/firebase");
const AuthenticationError = require("../exception/AuthenticationError");

const verifyToken = async (token) => {
  let tokenId = token.split(" ")[1];
  try {
    let decodedToken = await admin.auth().verifyIdToken(tokenId);
    let uid = await decodedToken.uid;
    let userId = uid;
    return userId;
  } catch (error) {
    console.log(error);

    throw new AuthenticationError("Anda Harus Login");
  }
};

module.exports = verifyToken;
