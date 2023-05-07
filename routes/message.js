const express = require("express");
const {
  newMessageGET,
  newMessagePOST,
  messagePage,
  deleteMessageGET,
  deleteMessagePOST,
} = require("../controllers/messageController");

const router = express.Router();

router.get("/new", newMessageGET);
router.post("/new", newMessagePOST);

router.get("/:id/delete", deleteMessageGET);
router.post("/:id/delete", deleteMessagePOST);

router.get("/:id", messagePage);

module.exports = router;
