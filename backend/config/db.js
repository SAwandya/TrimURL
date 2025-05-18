const mysql = require("mysql2");
require("dotenv").config();

// Create connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Convert to promise-based API
const promisePool = pool.promise();

// Test connection
(async () => {
  try {
    const connection = await promisePool.getConnection();
    console.log("Database connected successfully");

    // Create the urls table if it doesn't exist
    await connection.query(`
      CREATE TABLE IF NOT EXISTS urls (
        id INT AUTO_INCREMENT PRIMARY KEY,
        urlCode VARCHAR(10) NOT NULL UNIQUE,
        originalUrl TEXT NOT NULL,
        shortUrl VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expiresAt TIMESTAMP NOT NULL,
        clicks INT DEFAULT 0
      )
    `);
    console.log('Table "urls" initialized');

    connection.release();
  } catch (err) {
    console.error("Database connection failed:", err);
  }
})();

module.exports = promisePool;
