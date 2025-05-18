const validUrl = require("valid-url");
const crypto = require("crypto");


// Validate URL format
exports.isValidUrl = (url) => {
  return validUrl.isUri(url);
};

// Generate a unique short code for URLs
exports.generateShortCode = () => {
  const base62 =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let shortCode = "";
  const bytes = crypto.randomBytes(6); // 6 bytes = 48 bits ≈ log₂(62⁸)

  for (let i = 0; i < bytes.length; i++) {
    shortCode += base62[bytes[i] % 62];
  }

  return shortCode;
};
