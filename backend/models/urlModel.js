const db = require("../config/db");

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

exports.findByCode = async (code) => {
  const [rows] = await db.execute("SELECT * FROM urls WHERE urlCode = ?", [
    code,
  ]);
  return rows[0];
};

exports.findAll = async () => {
  const [rows] = await db.execute("SELECT * FROM urls ORDER BY createdAt DESC");
  return rows;
};

exports.delete = async (code) => {
  const [result] = await db.execute("DELETE FROM urls WHERE urlCode = ?", [
    code,
  ]);
  return result.affectedRows > 0;
};

exports.updateExpiration = async (code, newExpirationDate) => {
  const [result] = await db.execute(
    "UPDATE urls SET expiresAt = ? WHERE urlCode = ?",
    [newExpirationDate, code]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  const [rows] = await db.execute("SELECT * FROM urls WHERE urlCode = ?", [
    code,
  ]);
  return rows[0];
};
