const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // OK for assignment + Render
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/watchlist", require("./routes/watchlistRoutes"));
app.use("/api/portfolio", require("./routes/portfolioRoutes"));
app.use("/api/market", require("./routes/marketRoutes"));

// Health check (important for deployment)
app.get("/", (req, res) => {
  res.json({ status: "Market Lens API running" });
});

// DB + Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
