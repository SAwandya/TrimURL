const urlService = require("../services/url.service");
const { isValidUrl } = require("../utils/url.utils");

exports.shortenUrl = async (req, res, next) => {
  try {
    const { originalUrl, expiresIn } = req.body;

    // Validate URL
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid URL format",
      });
    }

    const expiration = expiresIn || 24 * 60 * 60 * 1000; // 24 hours in milliseconds

    const result = await urlService.createShortUrl(originalUrl, expiration);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
