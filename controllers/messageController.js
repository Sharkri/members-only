const asyncHandler = require("express-async-handler");

exports.newMessageGET = asyncHandler(async (req, res, next) => {
  res.render("new-message", {
    title: "New Message",
    message: {},
  });
});

exports.newMessagePOST = asyncHandler(async (req, res, next) => {
  res.send("TODO: Implement new message POST");
});
