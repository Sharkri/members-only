const express = require("express");
const {
  signUpFormGET,
  signUpFormPOST,
} = require("../controllers/signUpController");

const router = express.Router();

router.get("/", signUpFormGET);
router.post("/", signUpFormPOST);

module.exports = router;
