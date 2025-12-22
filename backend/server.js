require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

// ROUTES
const bookingRoutes = require("./routes/bookingRoutes");
const adminAuthRoutes = require("./routes/adminAuth");
const chatbotRoutes = require("./routes/chatbotRoutes");
const supportRoutes = require("./routes/support");

const app = express();

/* =====================
   DATABASE
===================== */
connectDB();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors()); // ✅ simple & correct (same domain)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =====================
   SERVE FRONTEND FILES
===================== */
app.use(express.static(path.join(__dirname, "../frontend")));

/* =====================
   API ROUTES
===================== */
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/chat", chatbotRoutes);
app.use("/api/support", supportRoutes);

/* =====================
   HEALTH CHECK
===================== */
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "API running 🚀" });
});

/* =====================
   FRONTEND FALLBACK
===================== */
// Allows direct access to /admin.html, /status.html, etc.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
