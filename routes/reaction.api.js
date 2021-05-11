const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body } = require("express-validator");
const reactionController = require("../controllers/reactionController");

router.post(
  "/",
  authMiddleware.loginRequired,
  validators.validate([
    body("targetType", "Invalid targetType").exists().isIn(["Blog", "Review"]),
    body("targetId", "Invalid targetId")
      .exists()
      .custom(validators.checkObjectId),
    body("emoji", "Invalid emoji")
      .exists()
      .isIn(["laugh", "sad", "like", "love", "angry"]),
  ]),
  reactionController.saveReaction
);

module.exports = router;
