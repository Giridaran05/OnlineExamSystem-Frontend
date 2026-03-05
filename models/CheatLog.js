const mongoose = require("mongoose");

const cheatLogSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam"
  },

  attempt: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Attempt"
  },

  type: {
    type: String,
    enum: [
      "fullscreen_exit",
      "tab_switch",
      "multiple_faces",
      "webcam_snapshot"
    ]
  },

  image: {
    type: String
  },

  message: {
    type: String
  },

  timestamp: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("CheatLog", cheatLogSchema);