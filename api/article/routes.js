const routes = (handler) => [
  {
    method: "GET",
    path: "/article",
    handler: handler.getArticleHandler,
  },
  {
    method: "GET",
    path: "/article/{id}",
    handler: handler.getArticleByIdHandler,
  },
];

module.exports = routes;
