const express = require("express");
const {
  becomeMemberGET,
  becomeMemberPOST,
  becomeAdminGET,
  becomeAdminPOST,
} = require("../controllers/userController");

const router = express.Router();

router.get("/become-a-member", becomeMemberGET);
router.post("/become-a-member", becomeMemberPOST);

router.get("/become-an-admin", becomeAdminGET);
router.post("/become-an-admin", becomeAdminPOST);

module.exports = router;
