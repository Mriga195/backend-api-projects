const express = require("express");
const authControllers = require("./../controllers/authControllers");
const contactControllers = require("./../controllers/contactControllers");

const router = express.Router();

router
  .route("/")
  .get(authControllers.protect, contactControllers.getAllContacts)
  .post(contactControllers.createContact);

router
  .route("/:id")
  .get(contactControllers.getContact)
  .patch(contactControllers.updateContact)
  .delete(contactControllers.deleteContact);

router.route("/search").get(contactControllers.search);
router.route("/favorites").get(contactControllers.favorites);

router.route("/:id/favorite").patch(contactControllers.toggleFavorite);

module.exports = router;
