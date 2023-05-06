const asyncHandler = require("express-async-handler");

const details = {
  member: {
    title: "Become a Member",
    description:
      "By becoming a member, you will be able to post messages and see the author and date of each message.",
  },

  admin: {
    title: "Become an Admin",
    description: "By becoming an admin, you will be able to delete messages.",
  },
};

exports.becomeMemberGET = asyncHandler(async (req, res, next) => {
  if (!req.user) res.redirect("/login");
  else {
    res.render("update-membership", details.member);
  }
});

exports.becomeMemberPOST = asyncHandler(async (req, res, next) => {
  if (req.body.password !== process.env.MEMBER_PASSWORD) {
    // re-render form with password error
    res.render("update-membership", {
      ...details.member,
      errors: { password: { msg: "Incorrect member password" } },
      password: req.body.password,
    });
    return;
  }

  if (req.user) {
    req.user.membershipStatus = "member";
    await req.user.save();

    res.redirect("/");
  } else {
    const err = new Error("User does not exist");
    err.status = 400;
    next(err);
  }
});

exports.becomeAdminGET = asyncHandler(async (req, res, next) => {
  if (!req.user) res.redirect("/login");
  else {
    res.render("update-membership", details.admin);
  }
});

exports.becomeAdminPOST = asyncHandler(async (req, res, next) => {
  if (req.body.password !== process.env.ADMIN_PASSWORD) {
    res.render("update-membership", {
      ...details.admin,
      errors: { password: { msg: "Incorrect admin password" } },
      password: req.body.password,
    });
    return;
  }

  if (req.user) {
    req.user.membershipStatus = "admin";
    await req.user.save();
    res.redirect("/");
  } else {
    const err = new Error("User does not exist");
    err.status = 400;
    next(err);
  }
});
