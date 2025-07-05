const express = require("express");
const contactRouter = require("./src/routes/contactRoutes");
const authRouter = require("./src/routes/authRoutes");
const userRouter = require("./src/routes/userRoutes");
const groupRouter = require("./src/routes/groupRoutes");

const AppError = require("./src/utils/appError");

const globalErrorHandler = require("./src/controllers/errorController");

const app = express();
// const rateLimit = require("express-rate-limit");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp");

// app.use(helmet());

// // if (process.env.NODE_ENV === 'development') {
// //   app.use(morgan());
// // }

// const limiter = rateLimit({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: "Too many requests from this IP, please try again in an hour",
// });

// app.use("/api", limiter);

app.use(express.json({ limit: "10kb" }));

// app.use(xss());

// app.use(
//   hpp({
//     whitelist: [
//       "duration",
//       "ratingsQuantity",
//       "ratingsAverage",
//       "maxGroupSize",
//       "difficulty",
//     ],
//   })
// );

app.use("/api/contacts", contactRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/groups", groupRouter);

app.use((req, res, next) => {
  next(new AppError(`The url ${req.originalUrl} is not valid`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
