const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  score: {
    type: Number,
    required: true
  },

  totalQuestions: {
    type: Number,
    required: true
  },

  percentage: {
    type: Number
  },

  submittedAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);