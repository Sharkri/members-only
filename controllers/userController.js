const asyncHandler = require("express-async-handler");

const memberDetails = {
  title: "Become a Member",
  description:
    "By becoming a member, you will be able to see the author and date of each message.",
};

exports.becomeMemberGET = asyncHandler(async (req, res, next) => {
  if (!req.user) res.redirect("/login");
  else {
    res.render("update-membership", memberDetails);
  }
});

exports.becomeMemberPOST = asyncHandler(async (req, res, next) => {
  if (req.body.password !== process.env.MEMBER_PASSWORD) {
    // re-render form with password error
    res.render("update-membership", {
      ...memberDetails,
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
