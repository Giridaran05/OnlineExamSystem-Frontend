const CheatLog = require("../models/CheatLog");

// ================================
// LOG CHEAT EVENT
// ================================

exports.logCheat = async (req, res) => {
  try {

    const { examId, eventType } = req.body;

    const log = await CheatLog.create({
      user: req.user.id,
      exam: examId,
      eventType
    });

    res.json({
      success: true,
      data: log
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};


// ================================
// GET CHEAT LOGS
// ================================

exports.getCheatLogs = async (req, res) => {
  try {

    const logs = await CheatLog.find({
      exam: req.params.examId
    }).populate("user", "username email");

    res.json({
      success: true,
      count: logs.length,
      data: logs
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};