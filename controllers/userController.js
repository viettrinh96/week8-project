const User = require("../model/user");
const bcrypt = require("bcrypt");

const userController = {};

userController.getAllData = async (req, res, next) => {
  try {
    const user = await User.find();
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.getData = async (req, res, next) => {
  try {
    // How to get the data
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.getCurrentData = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.createData = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Encode password first
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);
    console.log("What is", encodedPassword);

    // And save encode password
    const user = new User({
      username: username,
      email: email,
      password: encodedPassword,
    });
    await user.save();

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.updateData = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Encode password first
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);

    // And save encode password
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username: username, email: email, password: encodedPassword },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.updateCurrentData = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const { username, email, password } = req.body;
    // Encode password first
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);

    // And save encode password
    const userUpdate = await User.findByIdAndUpdate(
      userId,
      { username: username, email: email, password: encodedPassword },
      { new: true }
    );

    res.status(200).json({
      status: "Success",
      data: userUpdate,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

userController.deleteData = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      status: "Success",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

module.exports = userController;
