const Result = require("../models/Result");
const Exam = require("../models/Exam");
const Attempt = require("../models/Attempt");


// ==================================
// EXAM ANALYTICS SUMMARY
// ==================================

exports.getExamAnalytics = async (req, res) => {

  try {

    const examId = req.params.examId;

    const results = await Result.find({ exam: examId });

    const attempts = await Attempt.countDocuments({ exam: examId });

    if (results.length === 0) {

      return res.json({
        totalAttempts: attempts,
        averageScore: 0,
        passRate: 0,
        highestScore: 0,
        lowestScore: 0
      });

    }

    let totalScore = 0;

    results.forEach(r => {
      totalScore += r.score;
    });

    const scores = results.map(r => r.score);

    const highestScore = Math.max(...scores);
    const lowestScore = Math.min(...scores);

    const averageScore = totalScore / results.length;

    const passCount = results.filter(r => r.percentage >= 40).length;

    const passRate = (passCount / results.length) * 100;

    res.json({

      success: true,

      analytics: {
        totalAttempts: attempts,
        totalResults: results.length,
        averageScore,
        highestScore,
        lowestScore,
        passRate
      }

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// ==================================
// TOP PERFORMERS
// ==================================

exports.getTopPerformers = async (req, res) => {

  try {

    const examId = req.params.examId;

    const top = await Result
      .find({ exam: examId })
      .populate("user", "name email")
      .sort({ score: -1 })
      .limit(10);

    res.json({
      success: true,
      data: top
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// ==================================
// SCORE DISTRIBUTION
// ==================================

exports.getScoreDistribution = async (req, res) => {

  try {

    const examId = req.params.examId;

    const results = await Result.find({ exam: examId });

    const distribution = {
      "0-20": 0,
      "21-40": 0,
      "41-60": 0,
      "61-80": 0,
      "81-100": 0
    };

    results.forEach(r => {

      const p = r.percentage;

      if (p <= 20) distribution["0-20"]++;
      else if (p <= 40) distribution["21-40"]++;
      else if (p <= 60) distribution["41-60"]++;
      else if (p <= 80) distribution["61-80"]++;
      else distribution["81-100"]++;

    });

    res.json({
      success: true,
      distribution
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



// ==================================
// ATTEMPT STATISTICS
// ==================================

exports.getAttemptStats = async (req, res) => {

  try {

    const examId = req.params.examId;

    const totalAttempts = await Attempt.countDocuments({
      exam: examId
    });

    const completed = await Attempt.countDocuments({
      exam: examId,
      completed: true
    });

    const terminated = await Attempt.countDocuments({
      exam: examId,
      status: "terminated"
    });

    res.json({

      success: true,

      stats: {
        totalAttempts,
        completedAttempts: completed,
        terminatedAttempts: terminated
      }

    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};