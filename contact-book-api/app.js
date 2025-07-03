const express = require("express");
const contactRouter = require("./src/routes/contactRoutes");

const app = express();
app.use(express.json());

app.use("/api/contacts", contactRouter);

module.exports = app;
