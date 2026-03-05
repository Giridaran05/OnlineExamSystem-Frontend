const Result = require("../models/Result");
const Exam = require("../models/Exam");


// ===========================
// SUBMIT EXAM
// ===========================

exports.submitExam = async (req, res) => {

  try {

    const { examId, answers } = req.body;

    const exam = await Exam.findById(examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    const questions = exam.sections.flatMap(
      section => section.questions
    );

    let score = 0;

    questions.forEach((q) => {

      if (answers[q._id] === q.correctAnswer) {
        score++;
      }

    });

    const result = await Result.create({
      user: req.user.id,
      exam: examId,
      score,
      totalQuestions: questions.length,
      answers
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// ===========================
// GET USER RESULTS
// ===========================

exports.getUserResults = async (req, res) => {

  const results = await Result.find({
    user: req.user.id
  }).populate("exam");

  res.json({
    success: true,
    data: results
  });

};


// ===========================
// GET RESULT BY ID
// ===========================

exports.getResultById = async (req, res) => {

  const result = await Result.findById(
    req.params.resultId
  ).populate("exam");

  res.json({
    success: true,
    data: result
  });

};


// ===========================
// GET EXAM RESULTS
// ===========================

exports.getExamResults = async (req, res) => {

  const results = await Result.find({
    exam: req.params.examId
  }).populate("user");

  res.json({
    success: true,
    data: results
  });

};


// ===========================
// EXAM RESULT SUMMARY
// ===========================

exports.getExamResultSummary = async (req, res) => {

  const results = await Result.find({
    exam: req.params.examId
  });

  const totalAttempts = results.length;

  const avgScore =
    results.reduce((a, r) => a + r.score, 0) /
    (totalAttempts || 1);

  res.json({
    success: true,
    totalAttempts,
    avgScore
  });

};


// ===========================
// DELETE RESULT
// ===========================

exports.deleteResult = async (req, res) => {

  await Result.findByIdAndDelete(
    req.params.resultId
  );

  res.json({
    success: true,
    message: "Result deleted"
  });

};