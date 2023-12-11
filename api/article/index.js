const ArticleHandler = require("./handler");
const routes = require("./routes");

module.exports = {
  name: "article",
  version: "1.0.0",
  register: async (server) => {
    const articleHandler = new ArticleHandler();
    server.route(routes(articleHandler));
  },
};
