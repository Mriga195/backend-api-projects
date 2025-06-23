const mongoose = require("mongoose");
require("dotenv").config();

const DB_string = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(DB_string);
    console.log("database connected successfully");
  } catch (err) {
    console.log("Database connection error", err);
  }
};

module.exports = connectDB;
