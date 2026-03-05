const router = require("express").Router();

const {
 startExam,
 submitAnswer,
 nextSection,
 getCurrentSection
} = require("../controllers/attemptController");

const auth = require("../middleware/authMiddleware");

router.post("/start/:examId", auth, startExam);

router.post("/answer", auth, submitAnswer);

router.post("/next/:attemptId", auth, nextSection);

router.get("/section/:attemptId", auth, getCurrentSection);

module.exports = router;