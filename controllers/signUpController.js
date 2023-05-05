const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.signUpFormGET = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up", errors: {} });
});

exports.signUpFormPOST = [
  body("email")
    .trim()
    .toLowerCase()
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (email) => {
      const emailTaken = await User.exists({ email }).exec();
      if (emailTaken) return Promise.reject();

      return true;
    })
    .withMessage("Email already taken"),
  body("displayName")
    .trim()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Display name is required"),
  body("username")
    .trim()
    .isLength({ max: 25 })
    .withMessage("Username cannot be more than 25 characters")
    .custom((username) => {
      // alphanumeric and "_" non-consecutive
      const pattern = /^(?!.*__)[A-Za-z0-9_]+$/;
      return pattern.test(username);
    })
    .withMessage(
      "Username can only contain alphanumeric and non-consecutive underscores"
    )
    .custom(async (username) => {
      const usernameTaken = await User.exists({ username })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (usernameTaken) return Promise.reject();
      return true;
    })
    .withMessage("Username is already taken"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword")
    .custom((confirmPass, { req }) => req.body.password === confirmPass)
    .withMessage("Passwords do not match"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const { email, username, displayName, password, confirmPassword } =
      req.body;

    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        title: "Sign Up",
        email,
        username,
        displayName,
        password,
        confirmPassword,
        errors: errors.mapped(),
      });
    } else {
      // hash password with bcryptjs
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) reject(err);
          else resolve(hash);
        });
      });

      const user = new User({
        email,
        username,
        displayName,
        password: hashedPassword,
      });
      await user.save();
      res.redirect("/");
    }
  }),
];
