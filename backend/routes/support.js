const express = require("express");
const router = express.Router();
const Support = require("../models/Support");

// USER sends message
router.post("/message", async (req, res) => {
  const { email, message } = req.body;

  let convo = await Support.findOne({ userEmail: email });

  if (!convo) {
    convo = new Support({ userEmail: email, messages: [] });
  }

  convo.messages.push({
    sender: "user",
    text: message,
    createdAt: new Date()
  });

  await convo.save();
  res.json({ success: true });
});

// ADMIN fetch all conversations
router.get("/conversations", async (req, res) => {
  const data = await Support.find().sort({ updatedAt: -1 });
  res.json(data);
});

// ADMIN send reply
router.post("/reply", async (req, res) => {
  const { convoId, message } = req.body;

  const convo = await Support.findById(convoId);
  convo.messages.push({
    sender: "admin",
    text: message,
    createdAt: new Date()
  });

  await convo.save();
  res.json({ success: true });
});

module.exports = router;
