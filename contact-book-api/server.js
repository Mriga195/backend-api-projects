require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("Database is connected successfully");
});

const port = process.env.PORT || 3100;
app.listen(port, () => {
  console.log(`The server is running on port: ${port}`);
});
