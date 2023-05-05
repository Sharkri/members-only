const express = require("express");
const {
  loginFormGET,
  loginFormPOST,
} = require("../controllers/loginController");

const router = express.Router();

router.get("/", loginFormGET);
router.post("/", loginFormPOST);

module.exports = router;
