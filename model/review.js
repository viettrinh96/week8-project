const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = Schema(
  {
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    blog: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Blog" },
    reactions: {
      laugh: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);
const Blog = require("./blog");
//...
reviewSchema.statics.calculateReviews = async function (blogId) {
  const reviewCount = await this.find({ blog: blogId }).countDocuments();
  await Blog.findByIdAndUpdate(blogId, { reviewCount: reviewCount });
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateReviews(this.blog);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.doc = await this.findOne();
  next();
});

reviewSchema.post(/^findOneAnd/, async function (next) {
  await this.doc.constructor.calculateReviews(this.doc.blog);
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
