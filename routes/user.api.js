const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authentication");

router.get("/", userController.getAllData);
router.post("/", userController.createData);
router.get("/me", authMiddleware.loginRequired, userController.getCurrentData);
router.put(
  "/me",
  authMiddleware.loginRequired,
  userController.updateCurrentData
);
router.get("/:id", userController.getData);
router.put("/:id", userController.updateData);
router.delete("/:id", userController.deleteData);

module.exports = router;
