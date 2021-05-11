const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authMiddleware = require("../middleware/authentication");
const { body, param } = require("express-validator");
const validators = require("../middleware/validators");
router.get("/", blogController.getAllData);
router.post("/", authMiddleware.loginRequired, blogController.createData);
router.get(
  "/own",
  authMiddleware.loginRequired,
  validators.validate([
    body("title", "Missing title").exists().notEmpty(),
    body("description", "Missing content").exists().notEmpty(),
  ]),
  blogController.getCurrentUserBlogs
);
router.get(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  blogController.getData
);
router.put(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
    body("title", "Missing title").exists().notEmpty(),
    body("description", "Missing content").exists().notEmpty(),
  ]),
  blogController.updateData
);
router.delete(
  "/:id",
  validators.validate([
    param("id").exists().isString().custom(validators.checkObjectId),
  ]),
  blogController.deleteData
);

module.exports = router;
