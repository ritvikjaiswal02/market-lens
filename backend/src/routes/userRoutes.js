const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user.userId).select("-password");
  res.json(user);
});

module.exports = router;
