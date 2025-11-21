const express = require("express");
const router = express.Router();
const entryController = require("../controllers/entryController");

// Routes pour les entrées journalières
router.get("/", entryController.getAllEntries);
router.get("/month/:year/:month", entryController.getEntriesByMonth);
router.get("/:date", entryController.getEntryByDate);
router.post("/", entryController.createOrUpdateEntry);
router.delete("/:date", entryController.deleteEntry);

module.exports = router;
