const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: Number
    }
  ]
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  totalDuration: {
    type: Number,
    required: true
  },
  sections: [sectionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);