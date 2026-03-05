const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

// ROUTES
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");
const attemptRoutes = require("./routes/attemptRoutes");
const resultRoutes = require("./routes/resultRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const cheatRoutes = require("./routes/cheatRoutes");

dotenv.config();

// ===========================
// CONNECT DATABASE
// ===========================

connectDB();

const app = express();

// ===========================
// MIDDLEWARE
// ===========================

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);

app.use(express.json());

// ===========================
// HEALTH CHECK
// ===========================

app.get("/", (req, res) => {
  res.send("Online Examination System API Running");
});

// ===========================
// API ROUTES
// ===========================

app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/attempt", attemptRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/cheat", cheatRoutes);

// ===========================
// GLOBAL ERROR HANDLER
// ===========================

app.use((err, req, res, next) => {

  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Server Error"
  });

});

// ===========================
// START SERVER
// ===========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});