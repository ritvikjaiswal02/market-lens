import api from "./api";

// 🌍 Global market stats
export const getGlobalStats = async () => {
  const res = await api.get("/market/global");
  return res.data;
};

// 🥇 Top coins for dashboard cards
export const getTopCoins = async () => {
  const res = await api.get("/market/top");
  return res.data;
};

// 🔥 Trending coins
export const getTrending = async () => {
  const res = await api.get("/market/trending");
  return res.data;
};

// 📊 Price history (chart)
export const getHistory = async (coinId, days = 7) => {
  const res = await api.get(`/market/history/${coinId}`, {
    params: { days },
  });
  return res.data;
};
