const { getPool } = require("../config/database");

// Récupérer tous les types de moods disponibles
async function getAllMoodTypes(req, res) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }
    const [rows] = await pool.query("SELECT * FROM moods ORDER BY id");
    res.json({
      total: rows.length,
      moods: rows,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des types de mood:", error);
    res.status(500).json({ error: "Erreur serveur lors de la récupération des types de mood" });
  }
}

// Récupérer un type de mood par nom
async function getMoodTypeByName(req, res) {
  try {
    const pool = getPool();
    if (!pool) {
      return res.status(503).json({ error: "Base de données non disponible" });
    }

    const [rows] = await pool.query("SELECT * FROM moods WHERE name = ?", [
      req.params.name,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Type de mood non trouvé" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération du type de mood:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

module.exports = {
  getAllMoodTypes,
  getMoodTypeByName,
};
