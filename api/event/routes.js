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
  // SAVE
  {
    method: "POST",
    path: "/event/{id}/save",
    handler: handler.saveEventHandler,
  },
  {
    method: "GET",
    path: "/event/save",
    handler: handler.getSavedEventHandler,
  },
  {
    method: "DELETE",
    path: "/event/{id}/save",
    handler: handler.unSaveEventHandler,
  },
];

module.exports = routes;
