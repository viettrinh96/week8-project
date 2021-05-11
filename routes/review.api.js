const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authentication");
const validators = require("../middleware/validators");
const { body, param } = require("express-validator");
router.get(
  "/blog/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  reviewController.getReviewsOfBlog
);
router.post(
  "/blogs/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("description", "Missing content").exists().notEmpty(),
  ]),
  reviewController.createNewReview
);
router.put(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("content", "Missing content").exists().notEmpty(),
  ]),
  reviewController.updateSingleReview
);

router.delete(
  "/:id",
  authMiddleware.loginRequired,
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  reviewController.deleteSingleReview
);

module.exports = router;
