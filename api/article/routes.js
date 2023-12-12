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
  // LIKE
  {
    method: "POST",
    path: "/article/{id}/like",
    handler: handler.likeArticleHandler,
  },
  {
    method: "GET",
    path: "/article/{id}/like",
    handler: handler.getLikeArticleHandler,
  },
  {
    method: "DELETE",
    path: "/article/{id}/like",
    handler: handler.unLikeArticleHandler,
  },
];

module.exports = routes;
