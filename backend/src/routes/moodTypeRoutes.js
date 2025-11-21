const express = require("express");
const router = express.Router();
const moodTypeController = require("../controllers/moodTypeController");

// Routes pour les types de moods
router.get("/", moodTypeController.getAllMoodTypes);
router.get("/:name", moodTypeController.getMoodTypeByName);

module.exports = router;
