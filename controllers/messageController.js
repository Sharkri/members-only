const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message = require("../models/Message");

exports.newMessageGET = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  } else {
    res.render("new-message", {
      title: "New Message",
      message: {},
      errors: {},
    });
  }
});

exports.newMessagePOST = [
  body("title")
    .trim()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Title is required"),
  body("text")
    .trim()
    .isString()
    .isLength({ min: 1 })
    .withMessage("Message text is required"),

  asyncHandler(async (req, res, next) => {
    if (!req.user) {
      const err = new Error("User not logged in");
      err.status = 400;
      next(err);

      return;
    }

    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      author: req.user.id,
    });

    if (!errors.isEmpty()) {
      res.render("new-message", {
        title: "New Message",
        message,
        errors: errors.mapped(),
      });
    } else {
      await message.save();

      res.redirect("/");
    }
  }),
];
