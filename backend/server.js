const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req, res) => {
  res.send("CryptoSA backend running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
