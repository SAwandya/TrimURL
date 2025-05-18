const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
  // Log the error with stack trace
  logger.error(`Error: ${err.message}`, err);

  // Determine status code
  const statusCode = err.statusCode || 500;

  // Prepare response
  const response = {
    status: "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack in dev mode
  };

  res.status(statusCode).json(response);
};

// Custom Error class for better control
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish operational errors from programming errors
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { errorHandler, AppError };
