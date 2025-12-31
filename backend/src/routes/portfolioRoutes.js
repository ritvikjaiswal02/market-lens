const router = require("express").Router();
const Portfolio = require("../models/Portfolio");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {
  const holding = await Portfolio.create({
    userId: req.user.userId,
    ...req.body,
  });
  res.status(201).json(holding);
});

router.get("/", auth, async (req, res) => {
  const holdings = await Portfolio.find({ userId: req.user.userId });
  res.json(holdings);
});

router.put("/:coinId", auth, async (req, res) => {
  const updated = await Portfolio.findOneAndUpdate(
    { userId: req.user.userId, coinId: req.params.coinId },
    { quantity: req.body.quantity },
    { new: true }
  );
  res.json(updated);
});

router.delete("/:coinId", auth, async (req, res) => {
  await Portfolio.deleteOne({
    userId: req.user.userId,
    coinId: req.params.coinId,
  });
  res.json({ message: "Deleted" });
});

module.exports = router;
