const routes = (handler) => [
  {
    method: "POST",
    path: "/register",
    handler: handler.registerHandler,
  },
  {
    method: "POST",
    path: "/login",
    handler: handler.loginHandler,
  },
];

module.exports = routes;
