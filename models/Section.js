const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({

  title: String,

  duration: Number,

  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    }
  ]

});

module.exports = mongoose.model("Section", sectionSchema);