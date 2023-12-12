const ModelHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "model",
  version: "1.0.0",
  register: async (server) => {
    const modelHandler = new ModelHandler();
    server.route(routes(modelHandler));
  },
};
