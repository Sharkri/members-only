const express = require("express");
const {
  becomeMemberGET,
  becomeMemberPOST,
} = require("../controllers/userController");

const router = express.Router();

router.get("/become-a-member", becomeMemberGET);
router.post("/become-a-member", becomeMemberPOST);

module.exports = router;
