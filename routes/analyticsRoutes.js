const router = require("express").Router();

const {
  getExamAnalytics,
  getTopPerformers,
  getScoreDistribution,
  getAttemptStats
} = require("../controllers/analyticsController");

const auth = require("../middleware/authMiddleware");

router.get("/exam/:examId", auth, getExamAnalytics);

router.get("/top/:examId", auth, getTopPerformers);

router.get("/distribution/:examId", auth, getScoreDistribution);

router.get("/attempts/:examId", auth, getAttemptStats);

module.exports = router;