module.exports = (req, res, next) => {

 if (req.headers["x-cheat-flag"]) {

  return res.status(403).json({
   message: "Cheating detected"
  });

 }

 next();

};