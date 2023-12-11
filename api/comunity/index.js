const ProductsHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "product",
  version: "1.0.0",
  register: async (server, { validator }) => {
    const productsHandler = new ProductsHandler(validator);
    server.route(routes(productsHandler));
  },
};
