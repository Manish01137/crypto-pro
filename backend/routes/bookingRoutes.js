const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const adminAuth = require("../middleware/adminAuth");

const auth = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnly");
const bookingController = require("../controllers/bookingController");
const {
  createBooking,
  getBookingById,
  getAllBookings,
  updateBookingStatus
} = require("../controllers/bookingController");

/* =======================
   USER ROUTES (PUBLIC)
======================= */

// ✅ CREATE BOOKING
router.post("/", createBooking);

// ✅ CHECK BOOKING STATUS (PLACE BEFORE :id)
router.get("/status/:bookingId", async (req, res) => {
  try {
    const bookingId = req.params.bookingId.trim();

    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      status: booking.status || "Confirmed"
    });
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// ✅ GET BOOKING BY ID (KEEP AFTER STATUS)
router.get("/:id", getBookingById);

/* =======================
   ADMIN ROUTES (PROTECTED)
======================= */
router.post("/", bookingController.createBooking);
router.get("/:id", bookingController.getBookingById);

// ADMIN ONLY
router.get("/", adminAuth, bookingController.getAllBookings);
router.put("/:id/status", adminAuth, bookingController.updateBookingStatus);

module.exports = router;
