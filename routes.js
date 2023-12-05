const {
  registerHandler,
  loginHandler,
  celupHandler,
  insangHandler,
  kawungHandler,
  megaHandler,
  parangHandler,
  polengHandler,
  truntumHandler,
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/register",
    handler: registerHandler,
  },
  {
    method: "POST",
    path: "/login",
    handler: loginHandler,
  },
  {
    method: "GET",
    path: "/celup",
    handler: celupHandler,
  },
  {
    method: "GET",
    path: "/insang",
    handler: insangHandler,
  },
  {
    method: "GET",
    path: "/kawung",
    handler: kawungHandler,
  },
  {
    method: "GET",
    path: "/mega",
    handler: megaHandler,
  },
  {
    method: "GET",
    path: "/parang",
    handler: parangHandler,
  },
  {
    method: "GET",
    path: "/poleng",
    handler: polengHandler,
  },
  {
    method: "GET",
    path: "/truntum",
    handler: truntumHandler,
  },
];

module.exports = routes;
