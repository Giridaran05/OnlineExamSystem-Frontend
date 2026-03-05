const router = require("express").Router();

const {
  logCheat,
  getCheatLogs
} = require("../controllers/cheatLogController");

const auth = require("../middleware/authMiddleware");

// =======================
// LOG CHEAT EVENT
// =======================

router.post("/log", auth, logCheat);

// =======================
// GET CHEAT LOGS
// =======================

router.get("/exam/:examId", auth, getCheatLogs);

module.exports = router;