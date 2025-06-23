const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description: {
    type: String,
    maxlength: [50, "description cannot be more than 50 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  priority: {
    type: String,
    enum: {
      values: ["low", "medium", "high"],
      message: "priority can either be low, medium or high",
    },
    default: "medium",
  },
  priorityOrder: {
    type: Number,
    default: 2,
    min: [1, "cannot be lower than 1"],
    max: [3, "cannot be higher than 3"],
    select: false,
  },
  dueDate: {
    type: Date,
    validate: {
      validator: function (value) {
        return !value || value >= new Date();
      },
      message: "The due date cannot be in the past",
    },
  },
  category: {
    type: String,
    trim: true,
    maxlength: [50, "category cannot be more than 50 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

todoSchema.pre("save", function () {
  const priorityMap = { high: 1, medium: 2, low: 3 };
  this.priorityOrder = priorityMap[this.priority] || 2;
});

todoSchema.pre(["findOneAndUpdate", "updateMany", "updateOne"], function () {
  const update = this.getUpdate();
  if (update.priority || update.$set?.priority) {
    const priority = update.priority || update.$set?.priority;
    const priorityMap = { high: 1, medium: 2, low: 3 };

    if (update.$set) {
      update.$set.priorityOrder = priorityMap[priority] || 2;
    } else {
      update.priorityOrder = priorityMap[priority] || 2;
    }
  }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
