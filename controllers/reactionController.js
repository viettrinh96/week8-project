const Reaction = require("../model/reaction");
const mongoose = require("mongoose");
const reactionController = {};

reactionController.saveReaction = async (req, res, next) => {
  try {
    const { targetType, targetId, emoji } = req.body;
    const targetObj = await mongoose.model(targetType).findById(targetId);
    if (!targetObj) {
      return next();
    }

    let reaction = await Reaction.findOne({
      targetType,
      targetId,
      user: req.userId,
    });
    let message = "";
    if (!reaction) {
      await Reaction.create({ targetType, targetId, user: req.userId, emoji });
      message = "Added reaction";
    } else {
      if (reaction.emoji === emoji) {
        await Reaction.findOneAndDelete({ _id: reaction._id });
        message = "Removed reaction";
      } else {
        await Reaction.findOneAndUpdate({ _id: reaction._id }, { emoji });
        message = "Updated reaction";
      }
    }
    const reactionStat = await mongoose
      .model(targetType)
      .findById(targetId, "reactions");
    res.status(200).json({
      message: message,
      reaction: reactionStat.reactions,
    });
  } catch (error) {
    res.status(400).json({
      message: message,
      error: error.message,
    });
  }
};
module.exports = reactionController;
