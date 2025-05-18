const express = require("express");
const urlController = require("../controllers/urlController");

const router = express.Router();

// Create a shortened URL
router.post("/shorten", urlController.shortenUrl);

// Get URL details by code
router.get('/url/:code', urlController.getUrlByCode);

// Get all URLs
router.get('/urls', urlController.getAllUrls);

// Delete a URL
router.delete('/url/:code', urlController.deleteUrl);

// Update URL expiration
router.patch('/url/:code/extend', urlController.extendUrlExpiration);

module.exports = router;
