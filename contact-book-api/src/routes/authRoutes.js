const express = require("express");
const authControllers = require("../controllers/authControllers");

const router = express.Router();

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.post("/forgotPassword", authControllers.forgotPassword);
router.patch("/resetPassword/:token", authControllers.resetPassword);

router.use(authControllers.protect);
router.route("/refreshToken").patch(authControllers.refreshToken);
router
  .route("/profile")
  .get(authControllers.protect, authControllers.getProfile)
  .post(authControllers.updateProfile);

router.route("/change-password").post(authControllers.updatePassword);

module.exports = router;
