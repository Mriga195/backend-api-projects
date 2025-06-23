const express = require("express");
const todoRouter = require("./src/routes/todoRoutes");
const globalErrorHandler = require("./src/controllers/errorController");
const appError = require("./src/utils/appError");

const app = express();
app.use(express.json());

app.use("/api/v1/todo", todoRouter);

// app.all("*", (req, res, next) => {
//   next(new appError(`The url ${req.originalUrl} is not valid`, 404));
// });

app.use(globalErrorHandler);

module.exports = app;
