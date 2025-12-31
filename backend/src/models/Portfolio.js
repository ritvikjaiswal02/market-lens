const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coinId: String,
  quantity: Number,
});

module.exports = mongoose.model("Portfolio", portfolioSchema);
