const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatarUrl: { type: String, require: false, default: "" },
    friendCount: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false, select: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;
  delete obj.__v;
  return obj;
};

// Generate token
userSchema.methods.generateToken = async function () {
  const token = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  return token;
};
userSchema.plugin(require("./plugins/isDeletedFalse"));
const User = mongoose.model("User", userSchema);

module.exports = User;
