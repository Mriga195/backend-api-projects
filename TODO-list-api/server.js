const express = require("express");
require("dotenv").config();
const connectDB = require("./src/config/database");
const app = require("./app");
connectDB();

app.listen(process.env.PORT, (req, res) => {
  console.log("Server is running");
});
