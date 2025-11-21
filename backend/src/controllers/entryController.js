const { getPool } = require("../config/database");

// Fonction helper pour formater la date
function formatDate(date) {
  if (!date) return null;
  const d = new Date(date);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Récupérer toutes les entrées d'humeur
async function getAllMoods(req, res) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }
    const [rows] = await pool.query(`
      SELECT e.id, e.date, e.mood_id, e.note, e.created_at, e.updated_at,
             m.name as mood, m.emoji as mood_emoji
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      ORDER BY e.date DESC
    `);
    const entries = rows.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
    }));
    res.json({
      total: entries.length,
      entries: entries,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des entrées:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération des entrées" });
  }
}

// Récupérer une entrée par date
async function getMoodByDate(req, res) {
  try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(req.params.date)) {
      return res
        .status(400)
        .json({ error: "Format de date invalide. Utilisez YYYY-MM-DD" });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [rows] = await pool.query(
      `
      SELECT e.id, e.date, e.mood_id, e.note, e.created_at, e.updated_at,
             m.name as mood, m.emoji as mood_emoji
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      WHERE e.date = ?
    `,
      [req.params.date]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Aucune entrée pour cette date" });
    }

    const entry = {
      ...rows[0],
      date: formatDate(rows[0].date),
    };
    res.json(entry);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'entrée:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la récupération de l'entrée" });
  }
}

// Créer ou mettre à jour une entrée
async function createOrUpdateMood(req, res) {
  try {
    const { date, mood_id, note } = req.body;

    console.log(date, mood_id, note);

    if (!date || !mood_id) {
      return res.status(400).json({
        error: "date et mood_id sont requis",
      });
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res
        .status(400)
        .json({ error: "Format de date invalide. Utilisez YYYY-MM-DD" });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    // Vérifier que le mood_id existe
    const [moodExists] = await pool.query("SELECT id FROM moods WHERE id = ?", [
      mood_id,
    ]);

    if (moodExists.length === 0) {
      return res.status(400).json({
        error: "mood_id invalide. Le mood spécifié n'existe pas",
      });
    }

    const [existing] = await pool.query(
      "SELECT id FROM entries WHERE date = ?",
      [date]
    );

    if (existing.length > 0) {
      await pool.query(
        "UPDATE entries SET mood_id = ?, note = ? WHERE date = ?",
        [mood_id, note || null, date]
      );
    } else {
      await pool.query(
        "INSERT INTO entries (date, mood_id, note) VALUES (?, ?, ?)",
        [date, mood_id, note || null]
      );
    }

    const [result] = await pool.query(
      `
      SELECT e.id, e.date, e.mood_id, e.note, e.created_at, e.updated_at,
             m.name as mood, m.emoji as mood_emoji
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      WHERE e.date = ?
    `,
      [date]
    );

    res.json({
      message: existing.length > 0 ? "Entrée mise à jour" : "Entrée créée",
      entry: result[0],
    });
  } catch (error) {
    console.error("Erreur lors de la création/mise à jour de l'entrée:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la sauvegarde de l'entrée" });
  }
}

// Supprimer une entrée
async function deleteMood(req, res) {
  try {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(req.params.date)) {
      return res
        .status(400)
        .json({ error: "Format de date invalide. Utilisez YYYY-MM-DD" });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [result] = await pool.query("DELETE FROM entries WHERE date = ?", [
      req.params.date,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Entrée non trouvée" });
    }

    res.json({ message: "Entrée supprimée avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'entrée:", error);
    res
      .status(500)
      .json({ error: "Erreur serveur lors de la suppression de l'entrée" });
  }
}

// Récupérer les statistiques
async function getStats(req, res) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [countResult] = await pool.query(
      "SELECT COUNT(*) as total FROM entries"
    );

    const [moodDistribution] = await pool.query(`
      SELECT m.name as mood, m.emoji as mood_emoji, COUNT(*) as count
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      GROUP BY m.id, m.name, m.emoji
      ORDER BY count DESC
    `);

    const [recentEntries] = await pool.query(`
      SELECT e.date, m.name as mood, m.emoji as mood_emoji
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      WHERE e.date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      ORDER BY e.date DESC
    `);

    const formattedRecentEntries = recentEntries.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
    }));

    res.json({
      totalEntries: countResult[0].total,
      moodDistribution: moodDistribution,
      recentEntries: formattedRecentEntries,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des statistiques:", error);
    res
      .status(500)
      .json({
        error: "Erreur serveur lors de la récupération des statistiques",
      });
  }
}

// Récupérer les entrées d'un mois spécifique
async function getMoodsByMonth(req, res) {
  try {
    const { year, month } = req.params;

    if (!year || !month || isNaN(year) || isNaN(month)) {
      return res.status(400).json({ error: "Année et mois invalides" });
    }

    if (month < 1 || month > 12) {
      return res.status(400).json({ error: "Le mois doit être entre 1 et 12" });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [rows] = await pool.query(
      `
      SELECT e.id, e.date, e.mood_id, e.note, e.created_at, e.updated_at,
             m.name as mood, m.emoji as mood_emoji
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      WHERE YEAR(e.date) = ? AND MONTH(e.date) = ?
      ORDER BY e.date DESC
    `,
      [year, month]
    );

    const entries = rows.map((entry) => ({
      ...entry,
      date: formatDate(entry.date),
    }));

    res.json({
      year: parseInt(year),
      month: parseInt(month),
      total: entries.length,
      entries: entries,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des entrées du mois:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Récupérer les statistiques d'un mois spécifique
async function getMonthStats(req, res) {
  try {
    const { year, month } = req.params;

    if (!year || !month || isNaN(year) || isNaN(month)) {
      return res.status(400).json({ error: "Année et mois invalides" });
    }

    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [countResult] = await pool.query(
      "SELECT COUNT(*) as total FROM entries WHERE YEAR(date) = ? AND MONTH(date) = ?",
      [year, month]
    );

    const [moodDistribution] = await pool.query(
      `
      SELECT m.name as mood, m.emoji as mood_emoji, COUNT(*) as count
      FROM entries e
      INNER JOIN moods m ON e.mood_id = m.id
      WHERE YEAR(e.date) = ? AND MONTH(e.date) = ?
      GROUP BY m.id, m.name, m.emoji
      ORDER BY count DESC
    `,
      [year, month]
    );

    res.json({
      year: parseInt(year),
      month: parseInt(month),
      totalEntries: countResult[0].total,
      moodDistribution: moodDistribution,
    });
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des statistiques du mois:",
      error
    );
    res.status(500).json({ error: "Erreur serveur" });
  }
}

// Health check
async function healthCheck(req, res) {
  try {
    const pool = getPool();
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
}

module.exports = {
  getAllEntries: getAllMoods,
  getEntryByDate: getMoodByDate,
  createOrUpdateEntry: createOrUpdateMood,
  deleteEntry: deleteMood,
  getStats,
  getEntriesByMonth: getMoodsByMonth,
  getMonthStats,
  healthCheck,
};
