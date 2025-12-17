const express = require("express");
const router = express.Router();

const {
  registerAdmin,
  loginAdmin
} = require("../controllers/adminController");

const auth = require("../middleware/authMiddleware");

// Routes
router.post("/register", registerAdmin); // use once
router.post("/login", loginAdmin);

// Protected admin route
router.get("/dashboard", auth, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }

  res.json({
    message: "Welcome Admin Dashboard",
    adminId: req.user.id
  });
});

module.exports = router;
