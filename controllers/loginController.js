const asyncHandler = require("express-async-handler");
const passport = require("passport");

exports.loginFormGET = asyncHandler(async (req, res, next) => {
  res.render("login-form", {
    title: "Login",
    error: req.flash("error"),
  });
});

exports.loginFormPOST = [
  // Authenticate user
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
];
