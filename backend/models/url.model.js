const db = require("../config/db.config");

exports.create = async (urlData) => {
  const { urlCode, originalUrl, shortUrl, expiresAt } = urlData;

  const [result] = await db.execute(
    "INSERT INTO urls (urlCode, originalUrl, shortUrl, expiresAt) VALUES (?, ?, ?, ?)",
    [urlCode, originalUrl, shortUrl, expiresAt]
  );

  if (result.affectedRows === 0) {
    throw new Error("Failed to create shortened URL");
  }

  const [rows] = await db.execute("SELECT * FROM urls WHERE id = ?", [
    result.insertId,
  ]);
  return rows[0];
};
