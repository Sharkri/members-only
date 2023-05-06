const express = require("express");
const {
  signUpFormGET,
  signUpFormPOST,
} = require("../controllers/authController");

const router = express.Router();

router.get("/", signUpFormGET);
router.post("/", signUpFormPOST);

module.exports = router;
