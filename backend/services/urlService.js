const urlModel = require("../models/urlModel");
const { generateShortCode } = require("../utils/urlUtils");

exports.createShortUrl = async (originalUrl, expiresIn) => {
  // Generate a unique short code
  const urlCode = generateShortCode();

  // Calculate expiration date
  const expiresAt = new Date(Date.now() + expiresIn);

  // Create base URL from environment or default
  const baseUrl =
    process.env.BASE_URL;

  // Construct short URL
  const shortUrl = `${baseUrl}/${urlCode}`;

  // Create URL in database
  const newUrl = await urlModel.create({
    urlCode,
    originalUrl,
    shortUrl,
    expiresAt,
  });

  return newUrl;
};

exports.findUrlByCode = async (code) => {
  return await urlModel.findByCode(code);
};

exports.findAllUrls = async () => {
  return await urlModel.findAll();
};

exports.removeUrl = async (code) => {
  return await urlModel.delete(code);
};

exports.extendExpiration = async (code, additionalTime) => {
  const url = await urlModel.findByCode(code);

  if (!url) {
    return null;
  }

  // Calculate new expiration date
  const currentExpiration = new Date(url.expiresAt);
  const newExpiration = new Date(currentExpiration.getTime() + additionalTime);

  return await urlModel.updateExpiration(code, newExpiration);
};

exports.incrementClicks = async (code) => {
  return await urlModel.updateClicks(code);
};
