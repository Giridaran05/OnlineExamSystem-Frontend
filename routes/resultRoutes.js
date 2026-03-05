const router = require("express").Router();

const {
  getUserResults,
  getResultById,
  getExamResults,
  getExamResultSummary,
  deleteResult
} = require("../controllers/resultController");

const auth = require("../middleware/authMiddleware");

router.get("/user", auth, getUserResults);

router.get("/:resultId", auth, getResultById);

router.get("/exam/:examId", auth, getExamResults);

router.get("/summary/:examId", auth, getExamResultSummary);

router.delete("/:resultId", auth, deleteResult);

module.exports = router;