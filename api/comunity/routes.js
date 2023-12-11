const routes = (handler) => [
  // POST
  {
    method: "POST",
    path: "/post",
    handler: handler.addPostHandler,
  },
  {
    method: "GET",
    path: "/post",
    handler: handler.getPostHandler,
  },
  {
    method: "GET",
    path: "/post/{id}",
    handler: handler.getPostByIdHandler,
  },
  {
    method: "DELETE",
    path: "/post/{id}",
    handler: handler.deletePostByIdHandler,
  },
  // COMMENT
  {
    method: "POST",
    path: "/post/{id}/comment",
    handler: handler.addCommentHandler,
  },
  {
    method: "GET",
    path: "/post/{id}/comment",
    handler: handler.getCommentByPostIdHandler,
  },
  {
    method: "DELETE",
    path: "/post/{id}/comment/{commentId}",
    handler: handler.deleteCommentByIdHandler,
  },
  // LIKE
  {
    method: "POST",
    path: "/post/{id}/like",
    handler: handler.likePostHandler,
  },
  {
    method: "GET",
    path: "/post/{id}/like",
    handler: handler.getLikePostHandler,
  },
  {
    method: "DELETE",
    path: "/post/{id}/like",
    handler: handler.unLikePostHandler,
  },
];

module.exports = routes;
