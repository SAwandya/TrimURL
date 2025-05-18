const express = require("express");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", urlRoutes);

// // Redirect route for shortened URLs
// app.get("/:code", require("./controllers/url.controller").redirectToUrl);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

module.exports = app;
