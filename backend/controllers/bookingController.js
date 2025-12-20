const Booking = require("../models/Booking");
const generateBookingId = require("../utils/generateBookingId");
const adminAuth = require("../middleware/adminAuth"); // 🔐 ADD THIS

// ================================
// USER: CREATE BOOKING
// ================================
exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, packageName, amount } = req.body;

    if (!name || !email || !phone || !packageName || amount === undefined) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const booking = await Booking.create({
      bookingId: generateBookingId(),
      name,
      email,
      phone,
      packageName,
      amount,
      status: "pending"
    });

    res.status(201).json({
      success: true,
      bookingId: booking.bookingId,
      message: "Booking created successfully"
    });

  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// ================================
// USER: GET BOOKING BY BOOKING ID
// ================================
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      bookingId: req.params.id
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found"
      });
    }

    res.json({
      success: true,
      bookingId: booking.bookingId,
      status: booking.status,
      packageName: booking.packageName,
      amount: booking.amount,
      createdAt: booking.createdAt
    });

  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// ================================
// 🔐 ADMIN: GET ALL BOOKINGS
// ================================
exports.getAllBookings = [
  adminAuth, // 🔐 PROTECT
  async (req, res) => {
    try {
      const bookings = await Booking.find().sort({ createdAt: -1 });
      res.json(bookings);
    } catch (error) {
      console.error("Get all bookings error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
];

// ================================
// 🔐 ADMIN: UPDATE BOOKING STATUS
// ================================
exports.updateBookingStatus = [
  adminAuth, // 🔐 PROTECT
  async (req, res) => {
    try {
      const { status } = req.body;

      if (!["pending", "approved", "rejected"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid status"
        });
      }

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found"
        });
      }

      res.json({
        success: true,
        message: "Booking status updated",
        booking
      });

    } catch (error) {
      console.error("Update booking error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error"
      });
    }
  }
];
