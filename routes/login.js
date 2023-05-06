const express = require("express");
const {
  loginFormGET,
  loginFormPOST,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", loginFormGET);
router.post("/", loginFormPOST);

module.exports = router;
