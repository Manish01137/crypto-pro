const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

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

// CHECK BOOKING STATUS
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

module.exports = router;
