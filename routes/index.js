const express = require("express");
const { signUpFormGET } = require("../controllers/signUpController");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Members Only" });
});

router.get("/sign-up", signUpFormGET);

module.exports = router;
