const asyncHandler = require("express-async-handler");

exports.signUpFormGET = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up" });
});

exports.signUpFormPOST = asyncHandler(async (req, res, next) => {
  res.send("TODO: Implement sign up form post");
});
