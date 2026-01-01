import axios from "axios";

const COINGECKO = "https://api.coingecko.com/api/v3";

export const globalStats = async (req, res) => {
  try {
    const { data } = await axios.get(`${COINGECKO}/global`);
    res.json(data.data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch global stats" });
  }
};

export const topCoins = async (req, res) => {
  try {
    const { data } = await axios.get(`${COINGECKO}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 6,
        sparkline: true,
      },
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch coins" });
  }
};

export const trendingCoins = async (req, res) => {
  try {
    const { data } = await axios.get(`${COINGECKO}/search/trending`);
    res.json(data.coins);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch trending" });
  }
};
