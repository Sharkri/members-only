const express = require("express");
const {
  newMessageGET,
  newMessagePOST,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/", newMessageGET);
router.post("/", newMessagePOST);

module.exports = router;
