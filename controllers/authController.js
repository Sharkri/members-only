const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const User = require("../models/User");

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5242880 }, // 5mb
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("File format should be an image"), false);
    }
  },
});

// ---- LOGIN FORM ----

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

// ---- SIGN UP FORM ----

exports.signUpFormGET = asyncHandler(async (req, res, next) => {
  res.render("sign-up-form", { title: "Sign Up", errors: {} });
});

exports.signUpFormPOST = [
  upload.single("profilePicture"),

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
      const usernameTaken = await User.isUsernameTaken(username);
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

    const { username, displayName, password, confirmPassword } = req.body;

    if (!errors.isEmpty()) {
      res.render("sign-up-form", {
        title: "Sign Up",
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
        username,
        displayName,
        password: hashedPassword,
        profilePicture: req.file
          ? { data: req.file.buffer, contentType: req.file.mimetype }
          : undefined,
      });
      await user.save();

      next();
    }
  }),
  // Authenticate user
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
];
