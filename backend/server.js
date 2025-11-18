const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la base de données
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

// Initialisation de la connexion
async function initDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    const connection = await pool.getConnection();
    console.log("✅ Connexion à MySQL réussie!");
    connection.release();
  } catch (error) {
    console.error("❌ Erreur de connexion à MySQL:", error.message);
    setTimeout(initDatabase, 5000);
  }
}

// ========== ROUTES API ==========

// Page d'accueil de l'API
app.get("/", (req, res) => {
  res.json({
    message: "API Mood Tracker",
    version: "1.0.0",
    endpoints: {
      "GET /api/moods": "Récupérer toutes les entrées",
      "GET /api/moods/:date": "Récupérer une entrée par date (YYYY-MM-DD)",
      "POST /api/moods": "Créer/Mettre à jour une entrée",
      "DELETE /api/moods/:date": "Supprimer une entrée",
      "GET /api/stats": "Obtenir les statistiques",
      "GET /api/health": "Health check",
    },
  });
});

// Récupérer toutes les entrées d'humeur
app.get("/api/moods", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM entries ORDER BY date DESC"
    );
    res.json({
      total: rows.length,
      entries: rows,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

// Récupérer une entrée par date
app.get("/api/moods/:date", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM entries WHERE date = ?",
      [req.params.date]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Aucune entrée pour cette date" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

// Créer ou mettre à jour une entrée
app.post("/api/moods", async (req, res) => {
  try {
    const { date, mood, mood_emoji, note } = req.body;

    // Validation
    if (!date || !mood || !mood_emoji) {
      return res.status(400).json({
        error: "date, mood et mood_emoji sont requis",
      });
    }

    // Vérifier si une entrée existe déjà pour cette date
    const [existing] = await pool.query(
      "SELECT id FROM entries WHERE date = ?",
      [date]
    );

    if (existing.length > 0) {
      // Mise à jour
      await pool.query(
        "UPDATE entries SET mood = ?, mood_emoji = ?, note = ? WHERE date = ?",
        [mood, mood_emoji, note || null, date]
      );
    } else {
      // Création
      await pool.query(
        "INSERT INTO entries (date, mood, mood_emoji, note) VALUES (?, ?, ?, ?)",
        [date, mood, mood_emoji, note || null]
      );
    }

    // Récupérer l'entrée créée/mise à jour
    const [result] = await pool.query(
      "SELECT * FROM entries WHERE date = ?",
      [date]
    );

    res.json({
      message: existing.length > 0 ? "Entrée mise à jour" : "Entrée créée",
      entry: result[0],
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

// Supprimer une entrée
app.delete("/api/moods/:date", async (req, res) => {
  try {
    const [result] = await pool.query(
      "DELETE FROM entries WHERE date = ?",
      [req.params.date]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Entrée non trouvée" });
    }

    res.json({ message: "Entrée supprimée avec succès" });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

// Statistiques
app.get("/api/stats", async (req, res) => {
  try {
    // Total d'entrées
    const [countResult] = await pool.query(
      "SELECT COUNT(*) as total FROM entries"
    );

    // Distribution des humeurs
    const [moodDistribution] = await pool.query(
      "SELECT mood, mood_emoji, COUNT(*) as count FROM entries GROUP BY mood, mood_emoji ORDER BY count DESC"
    );

    // Entrées récentes (7 derniers jours)
    const [recentEntries] = await pool.query(
      "SELECT date, mood, mood_emoji FROM entries WHERE date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) ORDER BY date DESC"
    );

    res.json({
      totalEntries: countResult[0].total,
      moodDistribution: moodDistribution,
      recentEntries: recentEntries,
    });
  } catch (error) {
    console.error("Erreur:", error);
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    res.status(503).json({
      status: "unhealthy",
      database: "disconnected",
      error: error.message,
    });
  }
});

// Démarrage du serveur
async function startServer() {
  await initDatabase();

  app.listen(port, "0.0.0.0", () => {
    console.log("=".repeat(60));
    console.log("😊 Mood Tracker Backend démarré!");
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(
      `🗄️  Base de données: ${dbConfig.host}:${dbConfig.port}/${dbConfig.database}`
    );
    console.log("=".repeat(60));
  });
}

startServer();
