var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// cors
var cors = require("cors");

require("dotenv").config();

var indexRouter = require("./routes/index");
var categoryRouter = require("./routes/category");
var listsRouter = require("./routes/lists");
// mongodb
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

var app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", indexRouter);
app.use("/api/category", categoryRouter);
app.use("/api/lists", listsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // next(createError(404));
  res.status(404).json({ error: "Route not found" });
});

// error handler
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;

  res.status(status).json({
    error: {
      status: status,
      message: message,
      ...(req.app.get("env") === "development" && { stack: err.stack })
    }
  });
});

module.exports = app;
