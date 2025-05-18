const express = require("express");
const urlController = require("../controllers/url.controller");

const router = express.Router();

// Create a shortened URL
router.post("/shorten", urlController.shortenUrl);


module.exports = router;
