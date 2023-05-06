const express = require("express");
const { indexPage } = require("../controllers/indexController");

const router = express.Router();

/* GET home page. */
router.get("/", indexPage);

module.exports = router;
