const mongoose = require("mongoose");
const User = require("./userModel");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A group must have a name"],
    unique: [true, "A group must have a unique name"],
  },
  description: {
    type: String,
    maxlength: [100, "A group description can not be more than 100 characters"],
  },
  color: {
    type: String,
    validate: {
      validator: function (v) {
        return /^#([0-9A-F]{3}){1,2}$/i.test(v);
      },
      message: "Color must be a valid hex color code",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Contact",
    },
  ],
});

groupSchema.pre(/^find/, function (next) {
  this.populate({
    path: "members",
    select: "firstName lastName userName email",
  });

  next();
});

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
