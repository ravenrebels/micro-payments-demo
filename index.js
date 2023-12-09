import express from "express";
import { verifyPayment } from "./verifyPayment.js";
import { setupSession } from "./setupSession.js";
import config from "./config.js";
export const network = "rvn-test";

export const app = express();

setupSession(app);
app.use(verifyPayment);
//Only allow access to secure area if access is granted
app.use("/restricted", (request, response, next) => {
  if (request.session.accessGranted === true) {
    return next();
  }
  return response.redirect("/");
});

app.use(express.static("static"));
app.get("/api/session", (request, response) => {
  return response.send({
    address: request.session.address,
    accessGranted: request.session.accessGranted,
    network: config.network,
  });
});

app.get("/api/signout", (request, response) => {
  const callback = (err) => response.redirect("/");
  request.session.destroy(callback);
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  // Handle the rejection here
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Handle the exception here
  process.exit(1); // It is often recommended to restart the process in case of an uncaught exception
});
