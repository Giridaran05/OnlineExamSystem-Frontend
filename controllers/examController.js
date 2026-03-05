const Exam = require("../models/Exam");
const shuffleQuestions = require("../services/randomizeQuestion");


// ===============================
// CREATE EXAM WITH SECTIONS
// ===============================

exports.createExam = async (req, res) => {
  try {

    const { title, totalDuration, sections } = req.body;

    const exam = await Exam.create({
      title,
      totalDuration,
      sections,
      createdBy: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// GET ALL EXAMS
// ===============================

exports.getExams = async (req, res) => {
  try {

    const exams = await Exam.find();

    res.json({
      success: true,
      count: exams.length,
      data: exams
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// GET SINGLE EXAM WITH RANDOMIZED QUESTIONS
// ===============================

exports.getExamById = async (req, res) => {

  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    // Randomize questions inside each section

    exam.sections.forEach(section => {
      section.questions = shuffleQuestions(section.questions);
    });

    res.json({
      success: true,
      data: exam
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ===============================
// DELETE EXAM
// ===============================

exports.deleteExam = async (req, res) => {

  try {

    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found"
      });
    }

    res.json({
      success: true,
      message: "Exam deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// CREATE EXAM WITH SECTIONS
// ===============================

exports.createExam = async (req, res) => {
  try {

    const { title, totalDuration, sections } = req.body;

    const exam = await Exam.create({
      title,
      totalDuration,
      sections,
      createdBy: req.user?.id
    });

    res.status(201).json({
      success: true,
      message: "Exam created successfully",
      data: exam
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// GET ALL EXAMS
// ===============================

exports.getExams = async (req, res) => {
  try {

    const exams = await Exam.find();

    res.json({
      success: true,
      count: exams.length,
      data: exams
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ===============================
// GET SINGLE EXAM WITH RANDOMIZED QUESTIONS
// ===============================

exports.getExamById = async (req, res) => {

  try {

    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      return res.status(404).json({
        success: false,
        message: "Exam not found"
      });
    }

    // Randomize questions inside each section

    exam.sections.forEach(section => {
      section.questions = shuffleQuestions(section.questions);
    });

    res.json({
      success: true,
      data: exam
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};



// ===============================
// DELETE EXAM
// ===============================

exports.deleteExam = async (req, res) => {

  try {

    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      return res.status(404).json({
        message: "Exam not found"
      });
    }

    res.json({
      success: true,
      message: "Exam deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};