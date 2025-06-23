const Todo = require("./../models/todoModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");

exports.createToDo = catchAsync(async (req, res, next) => {
  const newTodo = await Todo.create(req.body);

  res.status(201).json({
    status: "success",
    data: newTodo,
  });
});

exports.getToDo = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Todo.find(), req.query).filter().sort();
  const todos = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      todos,
    },
  });
});

exports.getToDoById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const todo = await Todo.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.modifyToDo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).status({
    status: "success",
    data: {
      todo,
    },
  });
});

exports.deleteToDo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const todo = await Todo.findByIdAndDelete(id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.toggleCompletion = catchAsync(async (req, res, next) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;

  const updatedTodo = await todo.save();

  res.status(200).json({
    status: "success",
    data: {
      updatedTodo,
    },
  });
});

exports.statsToDo = catchAsync(async (req, res, next) => {
  const stats = await Todo.aggregate([
    {
      $group: {
        _id: null,
        total: { $sum: 1 },
        completed: { $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] } },
        pending: { $sum: { $cond: [{ $eq: ["$completed", false] }, 1, 0] } },
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      stats,
    },
  });
});
