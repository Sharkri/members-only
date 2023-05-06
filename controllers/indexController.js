const asyncHandler = require("express-async-handler");
const Message = require("../models/Message");

exports.indexPage = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
    .sort({ createdAt: "descending" })
    .populate("author")
    .exec();

  res.render("index", { title: "Members Only", messages });
});
