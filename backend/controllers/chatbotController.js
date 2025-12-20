

// exports.chatbotReply = async (req, res) => {
//   let { message, bookingId } = req.body;

//   if (!message) {
//     return res.status(400).json({ reply: "Message is required" });
//   }

//   const msg = message.trim().toUpperCase();

//   // Detect booking ID
//   const match = msg.match(/CRYPTO-\w+/);
//   if (match) bookingId = match[0];

//   // 1️⃣ Booking ID step
//   if (!bookingId) {
//     return res.json({
//       reply: "👋 Welcome! Please enter your Booking ID to continue."
//     });
//   }

//   // 2️⃣ After booking ID → show options
//   if (bookingId && msg === bookingId) {
//     return res.json({
//       reply: `✅ Booking ID verified: ${bookingId}\n\nWhat would you like to do?`,
//       options: [
//         { label: "🔍 Check Booking Status", value: "CHECK_STATUS" },
//         { label: "🧑‍💻 Talk to Support", value: "SUPPORT" },
//         { label: "❌ Exit", value: "EXIT" }
//       ]
//     });
//   }

//   // 3️⃣ Option handling
//   if (msg === "CHECK_STATUS") {
//     return res.json({
//       reply: `📌 Booking Status for ${bookingId}: CONFIRMED ✅`,
//       options: [
//         { label: "🔁 Check Again", value: "CHECK_STATUS" },
//         { label: "🧑‍💻 Talk to Support", value: "SUPPORT" },
//         { label: "❌ Exit", value: "EXIT" }
//       ]
//     });
//   }

//   if (msg === "SUPPORT") {
//     return res.json({
//       reply:
//         "🧑‍💻 A support executive will contact you shortly.\n📧 support@metacoins.ai"
//     });
//   }

//   if (msg === "EXIT") {
//     return res.json({
//       reply: "👋 Thank you for contacting MetaCoins AI. Have a great day!"
//     });
//   }

//   // fallback
//   res.json({
//     reply: "Please choose an option from above."
//   });
// };


exports.chatbotReply = async (req, res) => {
  const { message, bookingId } = req.body;

  // 1️⃣ Require booking ID first
  if (!bookingId) {
    return res.json({
      reply: "Please enter your Booking ID to continue."
    });
  }

  // 2️⃣ Booking ID just entered
  if (message === bookingId) {
    return res.json({
      reply: `✅ Booking ID verified: ${bookingId}\n\nWhat would you like to do?`,
      options: [
        { label: "🔍 Check Booking Status", value: "CHECK_STATUS" },
        { label: "🧑‍💻 Talk to Support", value: "SUPPORT" }
      ]
    });
  }

  // 3️⃣ Any option clicked → handover
  if (message === "CHECK_STATUS" || message === "SUPPORT") {
    return res.json({
      reply:
        "📨 Your request has been sent to our support team.\n⏳ We’ll update you shortly.",
      end: true
    });
  }

  // fallback
  return res.json({
    reply: "Please choose one of the options above."
  });
};
