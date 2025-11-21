const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
  timezone: '+00:00',
  dateStrings: true,
};

let pool;

async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    await connection.query("SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci");
    await connection.query("SET CHARACTER SET utf8mb4");
    await connection.query("SET character_set_client = utf8mb4");
    await connection.query("SET character_set_connection = utf8mb4");
    await connection.query("SET character_set_results = utf8mb4");
    console.log("✅ Connexion à MySQL réussie!");
    connection.release();
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL:", error.message);
    setTimeout(initDatabase, 5000);
  }
}

function getPool() {
  return pool;
}

module.exports = { initDatabase, getPool, dbConfig };
