
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");
const chatbotRoutes = require("./routes/chatbotRoutes");

const app = express();

/* =====================
   DATABASE
===================== */
connectDB();

/* =====================
   MIDDLEWARE
===================== */
app.use(cors({
  origin: [
    "https://frone.netlify.app",     // ✅ FRONTEND
    "http://localhost:5500",         // dev
    "http://127.0.0.1:5500",
    "http://localhost:3000"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
   credentials: true
}));
app.options("*", cors());

app.use(express.json());

/* =====================
   ROUTES
===================== */
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/support", require("./routes/support"));


/* =====================
   HEALTH CHECK
===================== */
app.get("/", (req, res) => {
  res.json({ status: "API running 🚀" });
});

/* =====================
   SERVER
===================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
