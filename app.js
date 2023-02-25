const path = require("path");
const express = require("express");
const CookieParser = require("cookie-parser");
const xss = require("xss-clean");
// const cors = require('cors');
const helmet = require("helmet");
const morgan = require("morgan");
const hbs = require("express-handlebars");
const AppError = require("./utils/appError");

//ROUTERS
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");
//GLOBAL MIDDLEWARES
const app = express();
//CORS settings
// app.use(
// 	cors({
// 		credentials: false,
// 		origin: false,
// 		optionsSuccessStatus: 200,
// 		methods: ["POST, GET, PUT, PATCH, DELETE"]
// 	})
// );

app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
//View engine
const ehbs = hbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  helpers: {},
});
app.engine("hbs", ehbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//Serving static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules")));
//Set security HTTP Headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

//Create a logger middleware
if (process.env.NODE_ENV === "development") {
  //Only log error responses
  morgan("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  });
}

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(CookieParser());
app.use(xss());

//ROUTES
app.use("/admin", adminRouter);
app.use("/", userRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
