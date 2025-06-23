const express = require("express");
const todoControllers = require("./../controllers/todoController");

const router = express.Router();

router.route("/stats").get(todoControllers.statsToDo);
router.route("/").post(todoControllers.createToDo).get(todoControllers.getToDo);

router
  .route("/:id")
  .get(todoControllers.getToDoById)
  .put(todoControllers.modifyToDo)
  .delete(todoControllers.deleteToDo);

router.route("/:id/toggle").patch(todoControllers.toggleCompletion);

module.exports = router;
