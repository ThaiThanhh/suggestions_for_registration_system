const dotenv = require("dotenv");
const app = require("./app");

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: "./configs/prod.env" });
} else {
  dotenv.config({ path: "./configs/dev.env" });
}
const port = process.env.PORT || 8000;
//Run server
const server = app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
