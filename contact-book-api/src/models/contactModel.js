const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "A first name is required"],
    },
    lastName: {
      type: String,
      required: [true, "A last name is required"],
    },
    email: {
      type: String,
      required: [true, "A user must have an email"],
      validate: {
        validator: validator.isEmail,
        message: "Please enter a valid email address",
      },
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    jobTitle: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    birthday: {
      type: Date,
    },
    notes: {
      type: String,
      maxlength: [1000, "note cannot be longer than 1000 characters"],
    },
    tags: [
      {
        type: String,
      },
    ],
    socialMedia: {
      linkedin: String,
      twitter: String,
      facebook: String,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
