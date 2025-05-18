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

exports.getUrlByCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const url = await urlService.findUrlByCode(code);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    // Check if URL has expired
    if (new Date() > new Date(url.expiresAt)) {
      return res.status(410).json({
        success: false,
        message: "URL has expired",
      });
    }

    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    next(error);
  }
};
