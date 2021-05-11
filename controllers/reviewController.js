const Review = require("../model/review");
const Blog = require("../model/blog");

const reviewController = {};

reviewController.createNewReview = async (req, res, next) => {
  try {
    const { description } = req.body;
    const review = new Review({
      user: req.userId,
      blog: req.params.id,
      description: description,
    });
    await review.save();

    res.status(200).json({
      status: "Success",
      data: blog,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};
reviewController.getReviewsOfBlog = async (req, res, next) => {
  try {
    const blogId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const totalReviews = await Review.countDocuments({ blog: blogId });
    const totalPages = Math.ceil(totalReviews / limit);
    const offset = limit * (page - 1);

    const reviews = await Review.find({ blog: blogId })
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    res.status(200).json({
      status: "Success",
      data: reviews,
      totalPages: totalPages,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

reviewController.updateSingleReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;
    const { content } = req.body;

    const review = await Review.findOneAndUpdate(
      { _id: reviewId, user: userId },
      { content },
      { new: true }
    );
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

reviewController.deleteSingleReview = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reviewId = req.params.id;
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });
    res.status(200).json({
      status: "Success",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};
module.exports = reviewController;
