const routes = (handler) => [
  {
    method: "POST",
    path: "/predicts",
    handler: handler.predictsHandler,
    options: {
      payload: {
        allow: "multipart/form-data",
        multipart: true,
      },
    },
  },
];

module.exports = routes;
