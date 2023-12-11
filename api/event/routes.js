const routes = (handler) => [
  {
    method: "GET",
    path: "/event",
    handler: handler.getEventHandler,
  },
  {
    method: "GET",
    path: "/event/{id}",
    handler: handler.getEventByIdHandler,
  },
];

module.exports = routes;
