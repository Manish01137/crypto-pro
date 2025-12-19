const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "admin"],
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const supportSchema = new mongoose.Schema(
  {
    userEmail: {
      type: String,
      required: true
    },
    messages: [messageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Support", supportSchema);
