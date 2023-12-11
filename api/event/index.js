const EventHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "event",
  version: "1.0.0",
  register: async (server) => {
    const eventHandler = new EventHandler();
    server.route(routes(eventHandler));
  },
};
