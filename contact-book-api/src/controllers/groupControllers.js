const Group = require("../models/groupModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllGroups = catchAsync(async (req, res, next) => {
  const groups = await Group.find({ userId: req.user.id });

  res.status(200).json({
    status: "success",
    results: groups.length,
    data: {
      groups,
    },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  if (req.body.userId !== req.user.id) {
    return next(new AppError("You can't create a group for another user", 403));
  }
  const group = await Group.create(req.body);

  res.status(201).json({
    message: "success",
    data: {
      group,
    },
  });
});

exports.getGroupById = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (group.userId !== req.user.id) {
    return next(new AppError("You can't access this group", 403));
  }

  res.status(200).json({
    status: "success",
    data: {
      group,
    },
  });
});

exports.updateGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (group.userId !== req.user.id) {
    return next(new AppError("You can't access this group", 403));
  }

  const groups = await Group.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      groups,
    },
  });
});

exports.deleteGroup = catchAsync(async (req, res, next) => {
  const group = await Group.findById(req.params.id);

  if (group.userId !== req.user.id) {
    return next(new AppError("You can't access this group", 403));
  }
  const groups = await Group.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});
