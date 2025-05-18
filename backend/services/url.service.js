const urlModel = require("../models/url.model");
const { generateShortCode } = require("../utils/url.utils");

exports.createShortUrl = async (originalUrl, expiresIn) => {
  // Generate a unique short code
  const urlCode = generateShortCode();

  // Calculate expiration date
  const expiresAt = new Date(Date.now() + expiresIn);

  // Create base URL from environment or default
  const baseUrl =
    process.env.BASE_URL || `http://localhost:${process.env.PORT || 3000}`;

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
