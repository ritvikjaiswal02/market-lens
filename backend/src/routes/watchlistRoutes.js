const router = require("express").Router();
const Watchlist = require("../models/Watchlist");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const item = await Watchlist.create({
    userId: req.user.userId,
    ...req.body,
  });
  res.status(201).json(item);
});

router.get("/", auth, async (req, res) => {
  const items = await Watchlist.find({ userId: req.user.userId });
  res.json(items);
});

router.delete("/:coinId", auth, async (req, res) => {
  await Watchlist.deleteOne({
    userId: req.user.userId,
    coinId: req.params.coinId,
  });
  res.json({ message: "Removed from watchlist" });
});

module.exports = router;
