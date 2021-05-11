const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    image: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    reactions: {
      laugh: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
    },
    reviewCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  { timestamps: true }
);
blogSchema.plugin(require("./plugins/isDeletedFalse"));
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
