const express = require("express");
const axios = require("axios");

const router = express.Router();

const COINGECKO_BASE = "https://api.coingecko.com/api/v3";
// 🌍 Global market stats
router.get("/global", async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE}/global`, {
      timeout: 5000,
    });

    res.json(response.data.data);
  } catch (err) {
    console.error("Global stats failed:", err.response?.status);
    res.status(500).json({ error: "Failed to fetch global stats" });
  }
});
// 🥇 Top coins for dashboard
router.get("/top", async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        sparkline: true,
        price_change_percentage: "24h",
      },
      timeout: 5000,
    });

    res.json(response.data);
  } catch (err) {
    console.error("Top coins failed:", err.response?.status);
    res.status(500).json({ error: "Failed to fetch top coins" });
  }
});
// 🔥 Trending coins
router.get("/trending", async (req, res) => {
  try {
    const response = await axios.get(`${COINGECKO_BASE}/search/trending`, {
      timeout: 5000,
    });

    res.json(response.data.coins.map(c => c.item));
  } catch (err) {
    console.error("Trending failed:", err.response?.status);
    res.status(500).json({ error: "Failed to fetch trending coins" });
  }
});

// 🔍 Search coins
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.json([]);

    const response = await axios.get(`${COINGECKO_BASE}/search`, {
      params: { query },
      timeout: 5000,
    });

    res.json(response.data.coins.slice(0, 5));
  } catch (err) {
    console.error("Search failed:", err.response?.status);
    res.json([]);
  }
});

// 💰 Market prices (SAFE)
router.get("/prices", async (req, res) => {
  try {
    const { ids } = req.query;
    if (!ids) return res.json([]);

    const response = await axios.get(`${COINGECKO_BASE}/coins/markets`, {
      params: {
        vs_currency: "usd",
        ids,
        price_change_percentage: "24h",
      },
      timeout: 5000,
    });

    if (!Array.isArray(response.data)) {
      return res.json([]);
    }

    res.json(response.data);
  } catch (err) {
    console.error("Prices failed:", err.response?.status);
    res.json([]);
  }
});

// 📈 Price history (SAFE)
router.get("/history/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const days = Number(req.query.days) || 7;
    const allowedDays = [1, 7, 30, 90];
    const safeDays = allowedDays.includes(days) ? days : 7;

    const response = await axios.get(
      `${COINGECKO_BASE}/coins/${id}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: safeDays,
        },
        timeout: 5000,
      }
    );

    if (!response.data || !response.data.prices) {
      return res.json([]);
    }

    res.json(response.data.prices);
  } catch (err) {
    console.error("History failed:", err.response?.status);
    res.json([]);
  }
});

module.exports = router;
