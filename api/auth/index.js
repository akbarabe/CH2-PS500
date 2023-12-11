const AuthHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "auth",
  version: "1.0.0",
  register: async (server, { validator }) => {
    const authHandler = new AuthHandler(validator);
    server.route(routes(authHandler));
  },
};
