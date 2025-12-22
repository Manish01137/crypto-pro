const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email);

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    console.error("❌ ADMIN credentials missing in ENV");
    return res.status(500).json({
      success: false,
      message: "Server misconfiguration"
    });
  }

  if (!process.env.JWT_SECRET) {
    console.error("❌ JWT_SECRET missing in ENV");
    return res.status(500).json({
      success: false,
      message: "Server misconfiguration"
    });
  }

  if (
    email !== process.env.ADMIN_EMAIL ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid admin credentials"
    });
  }

  const token = jwt.sign(
    { email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ success: true, token });
});

module.exports = router;
