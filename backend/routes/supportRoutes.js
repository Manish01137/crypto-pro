// import express from "express";
// import Support from "../models/Support.js";

// const router = express.Router();

// /* USER SEND MESSAGE */
// router.post("/send", async (req, res) => {
//   const { bookingId, text } = req.body;

//   if (!bookingId || !text) {
//     return res.status(400).json({ success: false });
//   }

//   let convo = await Support.findOne({ bookingId });

//   if (!convo) {
//     convo = new Support({ bookingId, messages: [] });
//   }

//   convo.messages.push({ sender: "user", text });
//   await convo.save();

//   res.json({ success: true });
// });

// /* GET MESSAGES (USER + ADMIN) */
// router.get("/:bookingId", async (req, res) => {
//   const convo = await Support.findOne({
//     bookingId: req.params.bookingId
//   });

//   res.json({
//     success: true,
//     messages: convo ? convo.messages : []
//   });
// });

// /* ADMIN REPLY */
// router.post("/reply", async (req, res) => {
//   const { bookingId, text } = req.body;

//   const convo = await Support.findOne({ bookingId });
//   if (!convo) return res.status(404).json({ success: false });

//   convo.messages.push({ sender: "admin", text });
//   await convo.save();

//   res.json({ success: true });
// });

// /* ADMIN – ALL CONVERSATIONS */
// router.get("/", async (req, res) => {
//   const conversations = await Support.find().sort({ updatedAt: -1 });
//   res.json(conversations);
// });

// export default router;
const express = require("express");
const router = express.Router();
const Support = require("../models/Support");

/* =========================
   USER SEND MESSAGE
========================= */
router.post("/send", async (req, res) => {
  try {
    console.log("🔥 MESSAGE RECEIVED:", req.body);

    const { bookingId, text } = req.body;
    if (!bookingId || !text) {
      return res.status(400).json({ success: false });
    }

    let convo = await Support.findOne({ bookingId });

    if (!convo) {
      convo = new Support({ bookingId, messages: [] });
    }

    convo.messages.push({ sender: "user", text });
    await convo.save();

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

/* =========================
   GET MESSAGES
========================= */
router.get("/:bookingId", async (req, res) => {
  const convo = await Support.findOne({
    bookingId: req.params.bookingId
  });

  res.json({
    success: true,
    messages: convo ? convo.messages : []
  });
});

/* =========================
   ADMIN REPLY
========================= */
router.post("/reply", async (req, res) => {
  const { bookingId, text } = req.body;

  const convo = await Support.findOne({ bookingId });
  if (!convo) {
    return res.status(404).json({ success: false });
  }

  convo.messages.push({ sender: "admin", text });
  await convo.save();

  res.json({ success: true });
});

/* =========================
   ADMIN – ALL CONVERSATIONS
========================= */
router.get("/", async (req, res) => {
  const conversations = await Support.find().sort({ updatedAt: -1 });
  res.json(conversations);
});

module.exports = router; // ✅ IMPORTANT
