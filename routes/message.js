const express = require("express");
const {
  newMessageGET,
  newMessagePOST,
  messagePage,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/new", newMessageGET);
router.post("/new", newMessagePOST);

router.get("/:id", messagePage);

module.exports = router;
