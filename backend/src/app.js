const express = require("express");
const cors = require("cors");
const moodTypeRoutes = require("./routes/moodTypeRoutes");
const entryRoutes = require("./routes/entryRoutes");
const entryController = require("./controllers/entryController");

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ charset: 'utf-8' }));
app.use(express.urlencoded({ extended: true, charset: 'utf-8' }));

// Force UTF-8 pour toutes les réponses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Page d'accueil de l'API
app.get("/", (req, res) => {
  res.json({
    message: "API Mood Tracker",
    version: "3.0.0",
    endpoints: {
      "GET /api/moods": "Récupérer tous les types de mood disponibles",
      "GET /api/moods/:name": "Récupérer un type de mood par nom",
      "GET /api/entries": "Récupérer toutes les entrées journalières",
      "GET /api/entries/:date": "Récupérer une entrée par date (YYYY-MM-DD)",
      "GET /api/entries/month/:year/:month": "Récupérer les entrées d'un mois",
      "POST /api/entries": "Créer/Mettre à jour une entrée",
      "DELETE /api/entries/:date": "Supprimer une entrée",
      "GET /api/stats": "Obtenir les statistiques globales",
      "GET /api/stats/:year/:month": "Obtenir les statistiques d'un mois",
      "GET /api/health": "Health check",
    },
  });
});

// Routes API
app.use("/api/moods", moodTypeRoutes);
app.use("/api/entries", entryRoutes);

// Routes pour les statistiques et health check
app.get("/api/stats", entryController.getStats);
app.get("/api/stats/:year/:month", entryController.getMonthStats);
app.get("/api/health", entryController.healthCheck);

module.exports = app;
