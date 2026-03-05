// =================================
// CHECK SECTION EXPIRY
// =================================
exports.isSectionExpired = (startTime, duration) => {

  if (!startTime || !duration) return false;

  const start = new Date(startTime);
  const now = new Date();

  const endTime = new Date(
    start.getTime() + duration * 60 * 1000
  );

  return now.getTime() > endTime.getTime();

};



// =================================
// CHECK EXAM EXPIRY
// =================================
exports.isExamExpired = (examEndTime) => {

  if (!examEndTime) return false;

  const now = new Date();

  const end = new Date(examEndTime);

  return now.getTime() > end.getTime();

};



// =================================
// GET REMAINING TIME (SECONDS)
// =================================
exports.getRemainingTime = (endTime) => {

  if (!endTime) return 0;

  const now = new Date();

  const end = new Date(endTime);

  const remainingMilliseconds =
    Math.max(0, end.getTime() - now.getTime());

  return Math.floor(remainingMilliseconds / 1000);

};



// =================================
// FORMAT TIME (MM:SS)
// Useful for frontend display
// =================================
exports.formatTime = (seconds) => {

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;

};