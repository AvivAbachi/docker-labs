import "dotenv";
import log4js from "log4js";
import http from "http";

const appID = `app-${process.env.APP_ID?.toLowerCase() || "none"}`;
const port = 3000;

log4js.configure("./log4js.json");
const appLoggers = log4js.getLogger();
appLoggers.addContext("appID", appID);

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.statusCode = 200;
  const ip = req?.socket?.remoteAddress;

  if (req.url === "/") {
    res.end(
      JSON.stringify({
        success: true,
        massage: "Hello, world!",
      }),
    );
    appLoggers.info(`[${req.url}] [${ip}] [${res.statusCode}]`);
  } else if (req.url === "/health") {
    res.end(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
      }),
    );
    appLoggers.info(`[${req.url}] [${ip}] [${res.statusCode}]`);
  } else if (req.url === "/error") {
    res.statusCode = 500;
    res.end(
      JSON.stringify({
        success: false,
        message: "Server fail",
      }),
    );
    throw new Error("Server Request to have a error");
  } else {
    res.statusCode = 404;
    res.end(
      JSON.stringify({
        success: false,
        message: "The requested resource does not exist",
      }),
    );
    appLoggers.error(
      `[${req.url}] [${ip}] [${res.statusCode}] - ${res.statusMessage}`,
    );
  }
});

server.listen(port, () => {
  appLoggers.info(`Server listening on port ${port}`);
});

process.on("unhandledRejection", (reason, promise) => {
  appLoggers.error("UNHANDLED REJECTION! Shutting down...");
  appLoggers.error("Unhandled Rejection at:", promise, "Reason:", reason);
  server.close(() => {
    appLoggers.fatal("Process terminated due to uncaught exception");
    log4js.shutdown(() => process.exit(1));
  });
});

process.on("uncaughtException", (error) => {
  appLoggers.error("UNCAUGHT EXCEPTION! Shutting down...");
  appLoggers.error(error.name, error.message);
  server.close(() => {
    appLoggers.fatal("Process terminated due to uncaught exception");
    log4js.shutdown(() => process.exit(1));
  });
});
