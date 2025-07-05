const fs = require("fs");
const User = require("./../../models/userModel");
const Contact = require("./../../models/contactModel");
const mongoose = require("mongoose");
require("dotenv").config();

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => {
  console.log("DB connection successful");
});

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));
const contacts = JSON.parse(
  fs.readFileSync(`${__dirname}/contacts.json`, "utf-8")
);

const importData = async (Model, modelInstance) => {
  try {
    await Model.create(modelInstance);
    console.log("Data successfully loaded");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async (Model) => {
  try {
    await Model.deleteMany();
    console.log("Data successfully deleted");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--import") {
  if (process.argv[3] === "users") {
    importData(User, users);
  } else if (process.argv[3] === "contacts") {
    importData(Contact, contacts);
  }
} else if (process.argv[2] === "--delete") {
  if (process.argv[3] === "users") {
    deleteData(User);
  } else if (process.argv[3] === "contacts") {
    deleteData(Contact);
  }
}
