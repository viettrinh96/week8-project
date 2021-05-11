const express = require("express");
const router = express.Router();
const userApi = require("./user.api");
const friendshipApi = require("./friendship.api");
const reviewApi = require("./review.api");
const reactionApi = require("./reaction.api");
const blogApi = require("./blog.api");
const authorApi = require("./author.api");

router.use("/user", userApi);
// router.use("/friendship", friendshipApi);
router.use("/review", reviewApi);
router.use("/reaction", reactionApi);
router.use("/blog", blogApi);
router.use("/", authorApi);
module.exports = router;
