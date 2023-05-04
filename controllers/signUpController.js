const asyncHandler = require("express-async-handler");

exports.signUpFormGET = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up Form" });
});
