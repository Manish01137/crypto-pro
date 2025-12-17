const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");

const {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

// =======================
// USER ROUTES (PUBLIC)
// =======================
router.post("/", createBooking);
router.get("/:id", getBookingById);

// =======================
// ADMIN ROUTES (PROTECTED)
// =======================
router.get("/", auth, adminOnly, getAllBookings);
router.put("/:id", auth, adminOnly, updateBookingStatus);

module.exports = router;
