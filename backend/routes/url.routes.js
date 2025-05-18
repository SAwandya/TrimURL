const express = require("express");
const urlController = require("../controllers/url.controller");

const router = express.Router();

// Create a shortened URL
router.post("/shorten", urlController.shortenUrl);

// Get URL details by code
router.get('/url/:code', urlController.getUrlByCode);

module.exports = router;
