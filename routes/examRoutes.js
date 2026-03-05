const router = require("express").Router();
const { createExam, getExams } = require("../controllers/examController");
const auth = require("../middleware/authMiddleware");

router.post("/create", auth, createExam);
router.get("/", auth, getExams);

module.exports = router;