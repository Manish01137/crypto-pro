import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: {
    type: String, // "user" | "admin"
    required: true
  },
  text: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const supportSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    required: true
  },
  messages: [messageSchema],
  status: {
    type: String,
    default: "open" // open | closed
  }
}, { timestamps: true });

export default mongoose.model("Support", supportSchema);
