const express = require("express");
const groupControllers = require("./../controllers/groupControllers");
const authControllers = require("./../controllers/authControllers");

const router = express.Router();

router.use(authControllers.protect);

router
  .route("/")
  .get(groupControllers.getAllGroups)
  .post(groupControllers.createGroup);

router
  .route("/:id")
  .get(groupControllers.getGroupById)
  .patch(groupControllers.updateGroup)
  .delete(groupControllers.deleteGroup);

module.exports = router;
