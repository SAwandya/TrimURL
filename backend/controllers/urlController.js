const urlService = require("../services/urlService");
const { isValidUrl } = require("../utils/urlUtils");

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

exports.getAllUrls = async (req, res, next) => {
  try {
    const urls = await urlService.findAllUrls();

    res.status(200).json({
      success: true,
      count: urls.length,
      data: urls,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteUrl = async (req, res, next) => {
  try {
    const { code } = req.params;
    const deleted = await urlService.removeUrl(code);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "URL deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

exports.extendUrlExpiration = async (req, res, next) => {
  try {
    const { code } = req.params;
    const { expiresIn } = req.body; // Additional hours to extend

    if (!expiresIn || isNaN(expiresIn)) {
      return res.status(400).json({
        success: false,
        message: "Valid expiration time in hours is required",
      });
    }

    const url = await urlService.extendExpiration(
      code,
      expiresIn * 60 * 60 * 1000
    );

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found",
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

exports.redirectToUrl = async (req, res, next) => {
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

    // Increment click count
    await urlService.incrementClicks(code);

    // Redirect to the original URL
    return res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};
