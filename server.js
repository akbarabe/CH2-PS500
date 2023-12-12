const Hapi = require("@hapi/hapi");
const ClientError = require("./exception/ClientError");

// plugin auth
const auth = require("./api/auth");
const AuthValidator = require("./validator/auth");

// plugin comunity
const comunity = require("./api/comunity");
const ComunityValidator = require("./validator/comunity");

// plugin article
const article = require("./api/article");

// plugin event
const event = require("./api/event");

const init = async () => {
  const server = Hapi.server({
    port: 8080,
    host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
  });
  // register plugin
  await server.register([
    {
      plugin: auth,
      options: {
        validator: AuthValidator,
      },
    },
    {
      plugin: comunity,
      options: {
        validator: ComunityValidator,
      },
    },
    {
      plugin: article,
    },
    {
      plugin: event,
    },
  ]);

  try {
    await server.start();
    console.log("Server running on %s", server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  server.ext("onPreResponse", (request, h) => {
    // mendapatkan konteks response dari request
    const { response } = request;
    if (response instanceof Error) {
      // penanganan client error secara internal.
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: "fail",
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }
      // mempertahankan penanganan client error oleh hapi secara native, seperti 404, etc.
      if (!response.isServer) {
        return h.continue;
      }
      // penanganan server error sesuai kebutuhan
      const newResponse = h.response({
        status: "fail",
        message: "terjadi kegagalan pada server kami",
      });
      newResponse.code(500);
      console.log(newResponse);
      return newResponse;
    }
    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa terintervensi)
    return h.continue;
  });
};

init();
