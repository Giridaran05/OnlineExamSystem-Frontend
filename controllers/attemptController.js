const Attempt = require("../models/Attempt");
const Exam = require("../models/Exam");
const Result = require("../models/Result");

const {
  isSectionExpired,
  isExamExpired,
  getRemainingTime
} = require("../services/timeService");


// =================================
// START EXAM
// =================================
exports.startExam = async (req, res) => {

  try {

    const exam = await Exam.findById(req.params.examId);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    const existingAttempt = await Attempt.findOne({
      user: req.user.id,
      exam: exam._id
    });

    if (existingAttempt) {
      return res.status(400).json({
        success: false,
        message: "You already attempted this exam"
      });
    }

    const now = new Date();

    const examEndTime =
      new Date(now.getTime() + exam.totalDuration * 60000);

    const attempt = await Attempt.create({

      user: req.user.id,
      exam: exam._id,

      startedAt: now,
      examEndTime,

      currentSection: 0,
      sectionStartTime: now,

      answers: [],
      completed: false

    });

    res.status(201).json({
      success: true,
      message: "Exam started",
      data: attempt
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// GET CURRENT SECTION
// =================================
exports.getCurrentSection = async (req, res) => {

  try {

    const attempt = await Attempt
      .findById(req.params.attemptId)
      .populate("exam");

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    if (attempt.completed) {
      return res.status(400).json({
        success: false,
        message: "Exam already finished"
      });
    }

    const section =
      attempt.exam.sections[attempt.currentSection];

    res.json({
      success: true,
      sectionNumber: attempt.currentSection,
      section
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// SUBMIT ANSWER
// =================================
exports.submitAnswer = async (req, res) => {

  try {

    const { attemptId, questionId, answer } = req.body;

    const attempt = await Attempt.findById(attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    if (attempt.completed) {
      return res.status(400).json({
        success: false,
        message: "Exam already finished"
      });
    }

    const exam = await Exam.findById(attempt.exam);

    // Check exam expiry
    if (isExamExpired(attempt.examEndTime)) {

      return res.status(403).json({
        success: false,
        message: "Exam time expired"
      });

    }

    const section = exam.sections[attempt.currentSection];

    // Check section expiry
    if (
      isSectionExpired(
        attempt.sectionStartTime,
        section.duration
      )
    ) {

      return res.status(403).json({
        success: false,
        message: "Section time expired"
      });

    }

    // Update answer if already exists
    const existing = attempt.answers.find(
      a => a.questionId === questionId
    );

    if (existing) {

      existing.answer = answer;

    } else {

      attempt.answers.push({
        questionId,
        answer
      });

    }

    await attempt.save();

    res.json({
      success: true,
      message: "Answer saved"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// NEXT SECTION
// =================================
exports.nextSection = async (req, res) => {

  try {

    const attempt = await Attempt.findById(req.params.attemptId);
    const exam = await Exam.findById(attempt.exam);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    if (isExamExpired(attempt.examEndTime)) {

      return res.status(403).json({
        success: false,
        message: "Exam time expired"
      });

    }

    if (attempt.currentSection + 1 >= exam.sections.length) {

      return res.json({
        success: true,
        message: "All sections completed"
      });

    }

    attempt.currentSection += 1;
    attempt.sectionStartTime = new Date();

    await attempt.save();

    res.json({
      success: true,
      message: "Moved to next section",
      currentSection: attempt.currentSection
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// GET REMAINING TIME
// =================================
exports.getRemainingExamTime = async (req, res) => {

  try {

    const attempt = await Attempt.findById(req.params.attemptId);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    const remaining =
      getRemainingTime(attempt.examEndTime);

    res.json({
      success: true,
      remainingSeconds: remaining
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// FINISH EXAM (AUTO GRADING)
// =================================
exports.finishExam = async (req, res) => {

  try {

    const attempt = await Attempt.findById(req.params.attemptId);
    const exam = await Exam.findById(attempt.exam);

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    if (attempt.completed) {
      return res.status(400).json({
        success: false,
        message: "Exam already finished"
      });
    }

    let score = 0;
    let totalQuestions = 0;

    exam.sections.forEach(section => {

      section.questions.forEach(question => {

        totalQuestions++;

        const userAnswer = attempt.answers.find(
          a => a.questionId === question._id.toString()
        );

        if (
          userAnswer &&
          userAnswer.answer === question.correctAnswer
        ) {
          score++;
        }

      });

    });

    const percentage =
      (score / totalQuestions) * 100;

    const result = await Result.create({

      user: attempt.user,
      exam: exam._id,
      score,
      totalQuestions,
      percentage

    });

    attempt.completed = true;

    await attempt.save();

    res.json({
      success: true,
      message: "Exam finished",
      result
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// =================================
// GET ATTEMPT DETAILS
// =================================
exports.getAttemptDetails = async (req, res) => {

  try {

    const attempt = await Attempt
      .findById(req.params.attemptId)
      .populate("exam");

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found"
      });
    }

    res.json({
      success: true,
      data: attempt
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};