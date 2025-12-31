const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coinId: String,
  coinName: String,
});

module.exports = mongoose.model("Watchlist", watchlistSchema);
    