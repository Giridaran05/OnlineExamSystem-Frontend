const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true
  },

  startedAt: {
    type: Date,
    default: Date.now
  },

  examEndTime: {
    type: Date
  },

  currentSection: {
    type: Number,
    default: 0
  },

  sectionStartTime: {
    type: Date
  },

  answers: [
    {
      questionId: String,
      answer: Number
    }
  ],

  // Anti-cheat violation counter
  violations: {
    type: Number,
    default: 0
  },

  // Track if exam terminated due to cheating
  terminated: {
    type: Boolean,
    default: false
  },

  // Exam completion status
  completed: {
    type: Boolean,
    default: false
  },

  // When exam was submitted
  submittedAt: {
    type: Date
  },

  // Status of attempt
  status: {
    type: String,
    enum: ["in_progress", "completed", "terminated"],
    default: "in_progress"
  }

}, { timestamps: true });

module.exports = mongoose.model("Attempt", attemptSchema);