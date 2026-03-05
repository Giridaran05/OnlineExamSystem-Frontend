const Result = require("../models/Result");

exports.getLeaderboard = async (req, res) => {

 const leaderboard = await Result
 .find({ exam: req.params.examId })
 .sort({ score: -1 })
 .limit(10)
 .populate("user", "name");

 res.json(leaderboard);

};