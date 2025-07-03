const Contact = require("./../models/contactModel");
const catchAsync = require("./../utils/catchAsync");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");

exports.getAllContacts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Contact.find(), req.query)
    .filter()
    .sort()
    .paginate()
    .limitFields();
  const contacts = await features.query;

  res.status(200).json({
    status: "success",
    results: contacts.length,
    data: {
      contacts,
    },
  });
});

exports.createContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.create(req.body);

  res.status(201).json({
    message: "success",
    data: {
      contact,
    },
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  id = req.params.id;

  const contact = await Contact.findById(id);

  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

exports.updateContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!contact) {
    return next(new AppError("The document does not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      contact,
    },
  });
});

exports.deleteContact = catchAsync(async (req, res, next) => {
  const contact = await Contact.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

exports.search = catchAsync(async (req, res, next) => {
  const allowedFields = ["name", "email", "phone", "company"];
  const filteredQuery = {};

  allowedFields.forEach((ele) => {
    if (req.query[ele] !== undefined) filteredQuery[ele] = req.query[ele];
  });

  const features = new APIFeatures(Contact.find(), filteredQuery).filter();
  const contacts = await features.query;

  res.status(200).json({
    status: "success",
    data: {
      contacts,
    },
  });
});

exports.favorites = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(
    Contact.find({ isFavorite: true }),
    req.query
  )
    .filter()
    .sort()
    .paginate()
    .limitFields();
  const contacts = await features.query;

  res.status(200).json({
    status: "success",
    results: contacts.length,
    data: {
      contacts,
    },
  });
});

exports.toggleFavorite = catchAsync(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    return next(new AppError("The document does not exist", 404));
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    [{ $set: { isFavorite: { $not: "$isFavorite" } } }],
    {
      new: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: {
      updatedContact,
    },
  });
});
