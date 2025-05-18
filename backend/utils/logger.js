const winston = require("winston");

const logger = winston.createLogger({
  level: "info", // Log info and above (info, warn, error)
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // Include stack traces for errors
    winston.format.printf(({ level, message, timestamp, stack }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${stack || message}`;
    })
  ),
  transports: [
    // Log to console (useful during development)
    new winston.transports.Console(),
    // Log all messages to combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),
    // Log only errors to error.log
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// Helper function to log API requests
const logRequest = (req, res, next) => {
  logger.info(
    `API Request: ${req.method} ${req.url} - User: ${
      req.user ? req.user._id : "Unauthenticated"
    }`
  );
  next();
};

module.exports = { logger, logRequest };
