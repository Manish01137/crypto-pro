const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN ATTEMPT:", email, password);
  console.log("ENV:", process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { email, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({ success: true, token });
  }

  res.status(401).json({
    success: false,
    message: "Invalid admin credentials"
  });
});

module.exports = router;
